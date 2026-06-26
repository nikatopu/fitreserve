import type { Booking, Class } from "../../../api";

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function toLocalDateStr(d: Date): string {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${mo}-${day}`;
}

export function getWeekStart(offset: number): Date {
  const now = new Date();
  const dow = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1) + offset * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function getWeekDays(start: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export function formatTime(t: string): string {
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${m} ${ampm}`;
}

export function formatDateLong(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
}

export function checkConflict(cls: Class, bookings: Booking[], allClasses: Class[]): boolean {
  return bookings
    .filter((b) => b.status !== "cancelled" && b.class_id !== cls.id)
    .some((b) => {
      const booked = b.class ?? allClasses.find((c) => c.id === b.class_id);
      if (!booked) return false;
      if (booked.date.substring(0, 10) !== cls.date.substring(0, 10)) return false;
      return booked.start_time < cls.end_time && booked.end_time > cls.start_time;
    });
}
