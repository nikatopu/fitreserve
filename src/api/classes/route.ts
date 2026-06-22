import { api } from '../client';
import type { Class, CreateClassDto, UpdateClassDto } from '../types';

export const classesApi = {
  getAll: (companyId?: string): Promise<Class[]> =>
    api.get<Class[]>(
      `/classes${companyId ? `?companyId=${companyId}` : ''}`
    ),

  getById: (id: string): Promise<Class> =>
    api.get<Class>(`/classes/${id}`),

  create: (dto: CreateClassDto): Promise<Class> =>
    api.post<Class>('/classes', dto),

  update: (id: string, dto: UpdateClassDto): Promise<Class> =>
    api.patch<Class>(`/classes/${id}`, dto),

  delete: (id: string): Promise<void> =>
    api.delete<void>(`/classes/${id}`),
};
