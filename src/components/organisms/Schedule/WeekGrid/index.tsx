import { useMemo } from "react";
import classNames from "classnames";
import { useAppContext } from "../../../../context/AppContext";
import { useBookings } from "../../../../context/BookingsContext";
import Paragraph from "../../../atoms/Paragraph";
import {
  DAY_NAMES,
  MONTH_NAMES,
  toLocalDateStr,
  getWeekStart,
  getWeekDays,
  formatTime,
} from "../scheduleUtils";
import style from "./WeekGrid.module.scss";

interface IProps {
  weekOffset: number;
  categoryFilter: string;
}

export default function WeekGrid({ weekOffset, categoryFilter }: IProps) {
  const { classesData, openModal } = useAppContext();
  const { myBookings, locallyBookedIds } = useBookings();

  const weekStart = useMemo(() => getWeekStart(weekOffset), [weekOffset]);
  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const classesByDay = useMemo(() => {
    return weekDays.map((day) => {
      const dayStr = toLocalDateStr(day);
      return (classesData ?? [])
        .filter((c) => {
          const inDay = c.date.substring(0, 10) === dayStr;
          const inCat =
            categoryFilter === "all" || c.program?.category === categoryFilter;
          return inDay && inCat;
        })
        .sort((a, b) => a.start_time.localeCompare(b.start_time));
    });
  }, [classesData, weekDays, categoryFilter]);

  return (
    <div className={style.grid}>
      {weekDays.map((day, i) => (
        <div key={i} className={style.column}>
          <div className={style.columnHeader}>
            <span className={style.dayName}>{DAY_NAMES[i]}</span>
            <span className={style.dayDate}>
              {MONTH_NAMES[day.getMonth()]} {day.getDate()}
            </span>
          </div>
          <div className={style.columnContent}>
            {classesByDay[i].length === 0 ? (
              <span className={style.empty}>—</span>
            ) : (
              classesByDay[i].map((c) => {
                const isLocalBooked = locallyBookedIds.has(c.id);
                const isActualBooked = myBookings.some(
                  (b) => b.class_id === c.id && b.status !== "cancelled",
                );
                const isBooked = isLocalBooked || isActualBooked;
                const seatsLeft =
                  c.max_seats -
                  (c._count?.bookings ?? 0) -
                  (isLocalBooked ? 1 : 0);
                const fullyBooked = seatsLeft <= 0;

                return (
                  <div
                    key={c.id}
                    className={style.card}
                    onClick={() => openModal("class-detail", { classId: c.id })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      openModal("class-detail", { classId: c.id })
                    }
                  >
                    {c.program?.category && (
                      <span className={style.categoryLabel}>
                        {c.program.category}
                      </span>
                    )}
                    <span className={style.cardTitle}>{c.title}</span>
                    {c.professional && (
                      <Paragraph
                        text={`${c.professional.first_name} ${c.professional.last_name}`}
                        size="small"
                      />
                    )}
                    <div className={style.divider} />
                    <div className={style.cardFooter}>
                      <span className={style.time}>
                        {formatTime(c.start_time)} – {formatTime(c.end_time)}
                      </span>
                      <span
                        className={classNames(style.seats, {
                          [style.full]: fullyBooked && !isBooked,
                          [style.booked]: isBooked,
                        })}
                      >
                        {isBooked
                          ? "Booked ✓"
                          : fullyBooked
                            ? "Fully Booked"
                            : `${seatsLeft} left`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
