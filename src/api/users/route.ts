import { api } from '../client';
import type { User, UpdateUserDto } from '../types';

export const usersApi = {
  getMe: (): Promise<User> => api.get<User>('/users/me'),

  updateMe: (dto: UpdateUserDto): Promise<User> =>
    api.patch<User>('/users/me', dto),

  getAll: (): Promise<User[]> => api.get<User[]>('/users'),
};
