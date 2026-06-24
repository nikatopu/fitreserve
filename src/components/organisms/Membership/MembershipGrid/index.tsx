import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useAppContext } from "../../../../context/AppContext";
import { membershipsApi } from "../../../../api";
import type { Membership, UserMembership } from "../../../../api";
import Paragraph from "../../../atoms/Paragraph";
import style from "./MembershipGrid.module.scss";

interface IProps {
  tierId: string | null;
}

export default function MembershipGrid({ tierId }: IProps) {
  const { isAuthenticated } = useAuth();
  const { allMembershipsData } = useAppContext();
  const navigate = useNavigate();

  const [myMemberships, setMyMemberships] = useState<UserMembership[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    membershipsApi
      .getMy()
      .then(setMyMemberships)
      .catch(() => {});
  }, [isAuthenticated]);

  const sorted = allMembershipsData
    ? [...allMembershipsData].sort((a, b) => a.price - b.price)
    : [];

  const displayed = tierId ? sorted.filter((m) => m.id === tierId) : sorted;
  const activeMembership = myMemberships[0] ?? null;

  function getTierIndex(m: Membership): number {
    return sorted.findIndex((s) => s.id === m.id);
  }

  function getRelation(
    target: Membership,
  ): "current" | "higher" | "lower" | "none" {
    if (!activeMembership) return "none";
    if (activeMembership.membership_id === target.id) return "current";
    const currentTier = getTierIndex(activeMembership.membership);
    const targetTier = getTierIndex(target);
    return targetTier > currentTier ? "higher" : "lower";
  }

  return (
    <>
      {activeMembership && (
        <div className={style.activeBanner}>
          <span className={style.activeDot} />
          <span className={style.activeBannerText}>
            Active membership:{" "}
            <strong>{activeMembership.membership.title}</strong>
          </span>
        </div>
      )}

      <div className={tierId ? style.detailGrid : style.grid}>
        {displayed.map((m) => {
          const rel = isAuthenticated ? getRelation(m) : "none";
          const tierIndex = getTierIndex(m);
          const isCurrent = rel === "current";

          return (
            <div
              key={m.id}
              className={[
                style.card,
                isCurrent ? style.cardCurrent : "",
                tierIndex === sorted.length - 1 ? style.cardTop : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={style.cardHeader}>
                {isCurrent && (
                  <span className={style.currentBadge}>Current Plan</span>
                )}
                {!isCurrent && tierIndex === sorted.length - 1 && (
                  <span className={style.topBadge}>Most Popular</span>
                )}
                <h2 className={style.cardTitle}>{m.title}</h2>
                <p className={style.cardPrice}>
                  <span className={style.priceAmount}>
                    ${m.price.toFixed(2)}
                  </span>
                  <span className={style.pricePer}> / month</span>
                </p>
              </div>

              {m.description && (
                <p className={style.cardDescription}>{m.description}</p>
              )}

              <div className={style.cardFooter}>
                {!isAuthenticated && (
                  <p className={style.inquireNote}>
                    <button
                      type="button"
                      className={style.inquireLink}
                      onClick={() => navigate("/login")}
                    >
                      Sign in
                    </button>
                    {" to view your membership status."}
                  </p>
                )}

                {isAuthenticated && isCurrent && (
                  <p className={style.inquireNote}>
                    {"To upgrade, downgrade, or cancel, "}
                    <a href="mailto:contact@fitreserve.com" className={style.inquireLink}>
                      contact our team
                    </a>
                    {"."}
                  </p>
                )}

                {isAuthenticated && !isCurrent && (
                  <p className={style.inquireNote}>
                    {"Interested in this plan? "}
                    <a href="mailto:contact@fitreserve.com" className={style.inquireLink}>
                      Contact us to get started
                    </a>
                    {"."}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {displayed.length === 0 && (
          <div className={style.empty}>
            <Paragraph text="No memberships found." />
          </div>
        )}
      </div>
    </>
  );
}
