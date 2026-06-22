import { api } from '../client';
import type { Company, CreateCompanyDto, UpdateCompanyDto } from '../types';

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

export const companiesApi = {
  getAll: (): Promise<Company[]> =>
    api.get<Company[]>(`/companies?projectId=${PROJECT_ID}`),

  getById: (id: string): Promise<Company> =>
    api.get<Company>(`/companies/${id}`),

  create: (dto: CreateCompanyDto): Promise<Company> =>
    api.post<Company>('/companies', dto),

  update: (id: string, dto: UpdateCompanyDto): Promise<Company> =>
    api.patch<Company>(`/companies/${id}`, dto),

  delete: (id: string): Promise<void> =>
    api.delete<void>(`/companies/${id}`),
};
