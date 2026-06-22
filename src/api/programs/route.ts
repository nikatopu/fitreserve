import { api } from '../client';
import type { Program, CreateProgramDto, UpdateProgramDto } from '../types';

export const programsApi = {
  getAll: (companyId?: string): Promise<Program[]> =>
    api.get<Program[]>(
      `/programs${companyId ? `?companyId=${companyId}` : ''}`
    ),

  getById: (id: string): Promise<Program> =>
    api.get<Program>(`/programs/${id}`),

  create: (dto: CreateProgramDto): Promise<Program> =>
    api.post<Program>('/programs', dto),

  update: (id: string, dto: UpdateProgramDto): Promise<Program> =>
    api.patch<Program>(`/programs/${id}`, dto),

  delete: (id: string): Promise<void> =>
    api.delete<void>(`/programs/${id}`),
};
