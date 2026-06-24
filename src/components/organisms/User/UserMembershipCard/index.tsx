import { useNavigate } from "react-router-dom";
import type { Booking, UserMembership } from "../../../../api";
import Button from "../../../atoms/Button";
import style from "./UserMembershipCard.module.scss";
import Title from "../../../atoms/Title";

interface IProps {
  memberships: UserMembership[];
  bookings: Booking[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTierClass(price: number, allPrices: number[]): string {
  if (allPrices.length === 0) return "";
  const sorted = [...allPrices].sort((a, b) => a - b);
  const index = sorted.indexOf(price);
  const tier = Math.floor((index / sorted.length) * 3);
  if (tier >= 2) return style.tierPlatinum;
  if (tier >= 1) return style.tierGold;
  return style.tierSilver;
}

const MONTHLY_LIMIT = 20;

export default function UserMembershipCard({ memberships, bookings }: IProps) {
  const navigate = useNavigate();
  const activeMembership = memberships[0] ?? null;
  const allPrices = memberships.map((m) => m.membership.price);

  const now = new Date();
  const classesThisMonth = bookings.filter((b) => {
    if (b.status === "cancelled" || !b.class?.date) return false;
    const d = new Date(b.class.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  const monthProgress = Math.min((classesThisMonth / MONTHLY_LIMIT) * 100, 100);

  if (!activeMembership) {
    return (
      <div className={style.card}>
        <div className={style.cardHeader}>
          <span className={style.label}>Membership</span>
          <span className={style.statusInactive}>Inactive</span>
        </div>
        <p className={style.noActive}>You do not have an active membership.</p>
        <Button
          label="View Memberships"
          onClick={() => navigate("/membership")}
          theme="primary"
        />
      </div>
    );
  }

  return (
    <div
      className={[
        style.card,
        getTierClass(activeMembership.membership.price, allPrices),
      ].join(" ")}
    >
      <div className={style.cardHeader}>
        <span className={style.label}>Membership Status</span>
        <span className={style.statusActive}>Active</span>
      </div>

      <Title
        text={activeMembership.membership.title}
        size="small"
        textAlign="left"
      />

      <p className={style.expiry}>
        Expires {formatDate(activeMembership.end_date)}
      </p>

      <div className={style.progress}>
        <div className={style.progressHeader}>
          <span className={style.progressLabel}>Classes this month</span>
          <span className={style.progressValue}>
            {classesThisMonth} / {MONTHLY_LIMIT}
          </span>
        </div>
        <div className={style.progressTrack}>
          <div
            className={style.progressBar}
            style={{ width: `${monthProgress}%` }}
          />
        </div>
      </div>

      <Button
        label="Manage Membership"
        onClick={() => navigate("/user/my-membership")}
        theme="secondary"
      />
    </div>
  );
}
