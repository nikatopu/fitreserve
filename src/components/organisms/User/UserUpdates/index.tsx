import type { Booking } from "../../../../api";
import Paragraph from "../../../atoms/Paragraph";
import style from "./UserUpdates.module.scss";

interface IProps {
  bookings: Booking[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function UserUpdates({ bookings }: IProps) {
  const recent = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return (
    <div className={style.section}>
      <h3 className={style.heading}>Recent Updates</h3>
      {recent.length === 0 ? (
        <Paragraph text="No recent activity." size="small" />
      ) : (
        <ul className={style.list}>
          {recent.map((b) => (
            <li key={b.id} className={style.item}>
              <span className={style.dot} />
              <div className={style.content}>
                <span className={style.text}>
                  {b.status === "cancelled"
                    ? `Booking cancelled — ${b.class?.title ?? "Class"}`
                    : `Booked — ${b.class?.title ?? "Class"}`}
                </span>
                <span className={style.date}>{formatDate(b.created_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
