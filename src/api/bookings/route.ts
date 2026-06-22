import { api } from '../client';
import type { Booking, CreateBookingDto } from '../types';

export const bookingsApi = {
  getMy: (): Promise<Booking[]> => api.get<Booking[]>('/bookings/my'),

  getAll: (): Promise<Booking[]> => api.get<Booking[]>('/bookings'),

  create: (dto: CreateBookingDto): Promise<Booking> =>
    api.post<Booking>('/bookings', dto),

  cancel: (id: string): Promise<Booking> =>
    api.patch<Booking>(`/bookings/${id}/cancel`),
};
