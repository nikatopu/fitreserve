import { api, setTokens, clearTokens } from '../client';
import type { AuthResponse, LoginDto, RegisterDto } from '../types';

export const authApi = {
  register: async (dto: RegisterDto): Promise<AuthResponse> => {
    const data = await api.post<AuthResponse>('/auth/register', dto);
    setTokens(data.access_token, data.refresh_token);
    return data;
  },

  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const data = await api.post<AuthResponse>('/auth/login', dto);
    setTokens(data.access_token, data.refresh_token);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post<void>('/auth/logout').catch(() => {});
    clearTokens();
  },
};
