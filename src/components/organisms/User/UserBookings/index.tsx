import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Booking } from "../../../../api";
import Button from "../../../atoms/Button";
import Paragraph from "../../../atoms/Paragraph";
import style from "./UserBookings.module.scss";

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

function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${m} ${ampm}`;
}

export default function UserBookings({ bookings }: IProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const now = new Date();
  const upcoming = bookings.filter((b) => {
    if (b.status === "cancelled") return false;
    if (!b.class?.date) return false;
    return new Date(b.class.date) >= now;
  });

  return (
    <div className={style.section}>
      <button
        type="button"
        className={style.toggle}
        onClick={() => setOpen((o) => !o)}
      >
        <span>Upcoming Bookings</span>
        <span className={style.count}>{upcoming.length}</span>
        <span className={style.chevron}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className={style.content}>
          {upcoming.length === 0 ? (
            <div className={style.empty}>
              <Paragraph text="No upcoming bookings." size="small" />
              <Button
                label="Browse Schedule"
                onClick={() => navigate("/schedule")}
                theme="secondary"
              />
            </div>
          ) : (
            <ul className={style.list}>
              {upcoming.map((b) => (
                <li key={b.id} className={style.item}>
                  <div className={style.info}>
                    <span className={style.title}>
                      {b.class?.title ?? "Class"}
                    </span>
                    <span className={style.meta}>
                      {b.class?.date ? formatDate(b.class.date) : "—"}
                      {b.class?.start_time
                        ? ` · ${formatTime(b.class.start_time)}`
                        : ""}
                    </span>
                  </div>
                  <span
                    className={[
                      style.status,
                      style[`status_${b.status}`],
                    ].join(" ")}
                  >
                    {b.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
