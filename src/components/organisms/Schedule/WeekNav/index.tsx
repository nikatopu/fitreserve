import { useMemo } from "react";
import { getWeekStart, getWeekDays, MONTH_NAMES } from "../scheduleUtils";
import style from "./WeekNav.module.scss";

interface IProps {
  weekOffset: number;
  onOffsetChange: (offset: number) => void;
}

export default function WeekNav({ weekOffset, onOffsetChange }: IProps) {
  const weekStart = useMemo(() => getWeekStart(weekOffset), [weekOffset]);
  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);
  const weekEnd = weekDays[6];

  const weekLabel = `${MONTH_NAMES[weekStart.getMonth()]} ${weekStart.getDate()} – ${MONTH_NAMES[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;

  return (
    <div className={style.weekNav}>
      <button
        type="button"
        className={style.navBtn}
        onClick={() => onOffsetChange(weekOffset - 1)}
      >
        ‹ Prev
      </button>
      <span className={style.label}>{weekLabel}</span>
      <button
        type="button"
        className={style.navBtn}
        onClick={() => onOffsetChange(weekOffset + 1)}
      >
        Next ›
      </button>
    </div>
  );
}
