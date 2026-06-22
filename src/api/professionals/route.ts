import { api } from '../client';
import type {
  Professional,
  CreateProfessionalDto,
  UpdateProfessionalDto,
} from '../types';

export const professionalsApi = {
  getAll: (companyId?: string): Promise<Professional[]> =>
    api.get<Professional[]>(
      `/professionals${companyId ? `?companyId=${companyId}` : ''}`
    ),

  getById: (id: string): Promise<Professional> =>
    api.get<Professional>(`/professionals/${id}`),

  create: (dto: CreateProfessionalDto): Promise<Professional> =>
    api.post<Professional>('/professionals', dto),

  update: (id: string, dto: UpdateProfessionalDto): Promise<Professional> =>
    api.patch<Professional>(`/professionals/${id}`, dto),

  delete: (id: string): Promise<void> =>
    api.delete<void>(`/professionals/${id}`),
};
