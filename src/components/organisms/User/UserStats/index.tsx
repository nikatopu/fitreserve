import type { Booking } from "../../../../api";
import style from "./UserStats.module.scss";

interface IProps {
  bookings: Booking[];
}

function calcStreak(bookings: Booking[]): number {
  if (bookings.length === 0) return 0;
  const weeks = new Set(
    bookings
      .filter((b) => b.status !== "cancelled")
      .map((b) => {
        const d = new Date(b.class?.date ?? b.created_at);
        const jan1 = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(
          ((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7,
        );
      }),
  );
  return weeks.size;
}

export default function UserStats({ bookings }: IProps) {
  const attended = bookings.filter((b) => b.status !== "cancelled").length;
  const calories = attended * 350;
  const streak = calcStreak(bookings);

  return (
    <div className={style.statsRow}>
      <div className={style.statCard}>
        <span className={style.statValue}>{attended}</span>
        <span className={style.statLabel}>Classes Attended</span>
      </div>
      <div className={style.statCard}>
        <span className={style.statValue}>{calories.toLocaleString()}</span>
        <span className={style.statLabel}>Calories Burned</span>
      </div>
      <div className={style.statCard}>
        <span className={style.statValue}>{streak}</span>
        <span className={style.statLabel}>Week Streak</span>
      </div>
    </div>
  );
}
