import { api } from '../client';
import type { Settings, UpdateSettingsDto } from '../types';

export const settingsApi = {
  get: (companyId: string): Promise<Settings> =>
    api.get<Settings>(`/settings/${companyId}`),

  update: (companyId: string, dto: UpdateSettingsDto): Promise<Settings> =>
    api.patch<Settings>(`/settings/${companyId}`, dto),
};
