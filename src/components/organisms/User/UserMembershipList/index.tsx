import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { membershipsApi } from "../../../../api";
import type { UserMembership } from "../../../../api";
import Title from "../../../atoms/Title";
import Paragraph from "../../../atoms/Paragraph";
import Button from "../../../atoms/Button";
import style from "./UserMembershipList.module.scss";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isActive(um: UserMembership): boolean {
  return new Date(um.end_date) >= new Date();
}

export default function UserMembershipList() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [myMemberships, setMyMemberships] = useState<UserMembership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    membershipsApi
      .getMy()
      .then(setMyMemberships)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className={style.loadingState}>
        <Paragraph text="Loading your memberships…" />
      </div>
    );
  }

  if (myMemberships.length === 0) {
    return (
      <div className={style.emptyState}>
        <Title text="No Active Membership" size="small" />
        <Paragraph text="You do not currently hold any membership. Browse our plans to get started." />
        <div className={style.emptyActions}>
          <Button
            label="View Memberships"
            onClick={() => navigate("/membership")}
            theme="primary"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={style.list}>
      {myMemberships.map((um) => {
        const active = isActive(um);
        return (
          <div
            key={um.id}
            className={[
              style.card,
              active ? style.cardActive : style.cardExpired,
            ].join(" ")}
          >
            <div className={style.cardTop}>
              <div>
                <span
                  className={active ? style.badgeActive : style.badgeExpired}
                >
                  {active ? "Active" : "Expired"}
                </span>
                <h2 className={style.cardTitle}>{um.membership.title}</h2>
              </div>
              <p className={style.cardPrice}>
                ${um.membership.price.toFixed(2)}
                <span className={style.cardPricePer}> / month</span>
              </p>
            </div>

            {um.membership.description && (
              <p className={style.cardDescription}>
                {um.membership.description}
              </p>
            )}

            <div className={style.cardDates}>
              <div className={style.dateField}>
                <span className={style.dateLabel}>Start date</span>
                <span className={style.dateValue}>
                  {formatDate(um.start_date)}
                </span>
              </div>
              <div className={style.dateField}>
                <span className={style.dateLabel}>Expiry date</span>
                <span className={style.dateValue}>
                  {formatDate(um.end_date)}
                </span>
              </div>
            </div>

            {active && (
              <p className={style.inquireNote}>
                {"To upgrade, downgrade, or cancel your membership, "}
                <a
                  href="mailto:contact@fitreserve.com"
                  className={style.inquireLink}
                >
                  contact our team
                </a>
                {"."}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
