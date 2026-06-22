import { api } from '../client';
import type {
  Membership,
  UserMembership,
  CreateMembershipDto,
  UpdateMembershipDto,
  AssignMembershipDto,
} from '../types';

export const membershipsApi = {
  getAll: (companyId?: string): Promise<Membership[]> =>
    api.get<Membership[]>(
      `/memberships${companyId ? `?companyId=${companyId}` : ''}`
    ),

  getById: (id: string): Promise<Membership> =>
    api.get<Membership>(`/memberships/${id}`),

  getMy: (): Promise<UserMembership[]> =>
    api.get<UserMembership[]>('/memberships/my'),

  create: (dto: CreateMembershipDto): Promise<Membership> =>
    api.post<Membership>('/memberships', dto),

  update: (id: string, dto: UpdateMembershipDto): Promise<Membership> =>
    api.patch<Membership>(`/memberships/${id}`, dto),

  delete: (id: string): Promise<void> =>
    api.delete<void>(`/memberships/${id}`),

  assign: (id: string, dto: AssignMembershipDto): Promise<UserMembership> =>
    api.post<UserMembership>(`/memberships/${id}/assign`, dto),
};
