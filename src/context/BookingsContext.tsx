import { createContext, useContext } from "react";
import type { Booking } from "../api";

export interface BookingsContextState {
  myBookings: Booking[];
  locallyBookedIds: Set<string>;
}

export const BookingsContext = createContext<BookingsContextState>({
  myBookings: [],
  locallyBookedIds: new Set(),
});

export function useBookings(): BookingsContextState {
  return useContext(BookingsContext);
}
