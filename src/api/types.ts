// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserDto {
  first_name?: string;
  last_name?: string;
}

// ─── Company ──────────────────────────────────────────────────────────────────

export interface Company {
  id: string;
  project_id: string;
  name: string;
  email?: string;
  phone?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyDto {
  project_id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface UpdateCompanyDto {
  project_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
}

// ─── Professional ─────────────────────────────────────────────────────────────

export interface Professional {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  specialization?: string;
  bio?: string;
  image_url?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProfessionalDto {
  company_id: string;
  first_name: string;
  last_name: string;
  specialization?: string;
  bio?: string;
  image_url?: string;
  active?: boolean;
}

export interface UpdateProfessionalDto {
  first_name?: string;
  last_name?: string;
  specialization?: string;
  bio?: string;
  image_url?: string;
  active?: boolean;
}

// ─── Program ──────────────────────────────────────────────────────────────────

export interface Program {
  id: string;
  company_id: string;
  title: string;
  description?: string;
  category?: string;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProgramDto {
  company_id: string;
  title: string;
  description?: string;
  category?: string;
  duration_minutes: number;
}

export interface UpdateProgramDto {
  title?: string;
  description?: string;
  category?: string;
  duration_minutes?: number;
}

// ─── Membership ───────────────────────────────────────────────────────────────

export interface Membership {
  id: string;
  company_id: string;
  title: string;
  description?: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateMembershipDto {
  company_id: string;
  title: string;
  description?: string;
  price: number;
}

export interface UpdateMembershipDto {
  title?: string;
  description?: string;
  price?: number;
}

export interface AssignMembershipDto {
  user_id: string;
  start_date: string;
  end_date: string;
}

export interface UserMembership {
  id: string;
  user_id: string;
  membership_id: string;
  start_date: string;
  end_date: string;
  membership: Membership;
}

// ─── Class ────────────────────────────────────────────────────────────────────

export interface Class {
  id: string;
  company_id: string;
  professional_id: string;
  program_id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  max_seats: number;
  booked_seats: number;
  created_at: string;
  updated_at: string;
  professional?: Professional;
  program?: Program;
}

export interface CreateClassDto {
  company_id: string;
  professional_id: string;
  program_id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  max_seats: number;
}

export interface UpdateClassDto {
  professional_id?: string;
  program_id?: string;
  title?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  max_seats?: number;
}

// ─── Booking ──────────────────────────────────────────────────────────────────

export interface Booking {
  id: string;
  user_id: string;
  class_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  class?: Class;
}

export interface CreateBookingDto {
  class_id: string;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface Settings {
  id: string;
  company_id: string;
  gym_status?: string;
  announcement?: string;
  updated_at: string;
}

export interface UpdateSettingsDto {
  gym_status?: string;
  announcement?: string;
}
