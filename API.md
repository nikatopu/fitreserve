# API Reference

Base URL: `https://universal-platform-backend.onrender.com/api/v1`  
Interactive docs: `https://universal-platform-backend.onrender.com/api/docs`  
Project ID: `fitreserve`

---

## Setup

Copy `.env.example` to `.env` and fill in your values:

```env
REACT_APP_API_URL=https://backend.com/api/v1
REACT_APP_PROJECT_ID=project-id
```

---

## Authentication

Protected routes require a Bearer token:

```
Authorization: Bearer <access_token>
```

Access tokens expire in **15 minutes**. Use `POST /auth/refresh` with the refresh token to obtain a new one. The API client handles this automatically — it will retry a failed request once after refreshing.

Tokens are stored in `localStorage` under the keys:

- `fitreserve_access_token`
- `fitreserve_refresh_token`

---

## Client

All services are exported from `src/api/index.ts`:

```ts
import {
  authApi,
  usersApi,
  companiesApi,
  professionalsApi,
  programsApi,
  membershipsApi,
  classesApi,
  bookingsApi,
  settingsApi,
} from "../api";
```

Errors throw an `ApiError` with `statusCode` and `message`:

```ts
import { ApiError } from "../api";

try {
  await classesApi.getAll(companyId);
} catch (err) {
  if (err instanceof ApiError) {
    console.error(err.statusCode, err.message);
  }
}
```

---

## Auth — `/auth`

**File:** `src/api/auth/route.ts`

| Method | Endpoint         | Access | Description                                 |
| ------ | ---------------- | ------ | ------------------------------------------- |
| POST   | `/auth/register` | Public | Register and receive tokens                 |
| POST   | `/auth/login`    | Public | Login and receive tokens                    |
| POST   | `/auth/refresh`  | Member | Exchange refresh token for new access token |
| POST   | `/auth/logout`   | Member | Invalidate session                          |

```ts
// Register
authApi.register({ email, password, first_name, last_name });

// Login
authApi.login({ email, password });

// Logout
authApi.logout();
```

`login` and `register` automatically store tokens. `logout` clears them.

---

## Users — `/users`

**File:** `src/api/users/route.ts`

| Method | Endpoint    | Access | Description         |
| ------ | ----------- | ------ | ------------------- |
| GET    | `/users/me` | Member | Get current user    |
| PATCH  | `/users/me` | Member | Update current user |
| GET    | `/users`    | Admin  | List all users      |

```ts
usersApi.getMe();
usersApi.updateMe({ first_name, last_name });
usersApi.getAll();
```

---

## Companies — `/companies`

**File:** `src/api/companies/route.ts`

| Method | Endpoint                          | Access | Description                     |
| ------ | --------------------------------- | ------ | ------------------------------- |
| GET    | `/companies?projectId=fitreserve` | Public | List companies for this project |
| GET    | `/companies/:id`                  | Public | Get a single company            |
| POST   | `/companies`                      | Admin  | Create a company                |
| PATCH  | `/companies/:id`                  | Admin  | Update a company                |
| DELETE | `/companies/:id`                  | Admin  | Delete a company                |

```ts
companiesApi.getAll();               // filtered to fitreserve project automatically
companiesApi.getById(id);
companiesApi.create({ project_id, name, email?, phone? });
companiesApi.update(id, { name?, email?, phone?, status? });
companiesApi.delete(id);
```

---

## Professionals (Trainers) — `/professionals`

**File:** `src/api/professionals/route.ts`

| Method | Endpoint                    | Access | Description                                   |
| ------ | --------------------------- | ------ | --------------------------------------------- |
| GET    | `/professionals?companyId=` | Public | List trainers, optionally filtered by company |
| GET    | `/professionals/:id`        | Public | Get a single trainer                          |
| POST   | `/professionals`            | Admin  | Create a trainer                              |
| PATCH  | `/professionals/:id`        | Admin  | Update a trainer                              |
| DELETE | `/professionals/:id`        | Admin  | Delete a trainer                              |

```ts
professionalsApi.getAll(companyId?);
professionalsApi.getById(id);
professionalsApi.create({ company_id, first_name, last_name, specialization?, bio?, image_url?, active? });
professionalsApi.update(id, { first_name?, last_name?, specialization?, bio?, image_url?, active? });
professionalsApi.delete(id);
```

---

## Programs — `/programs`

**File:** `src/api/programs/route.ts`

| Method | Endpoint               | Access | Description                                   |
| ------ | ---------------------- | ------ | --------------------------------------------- |
| GET    | `/programs?companyId=` | Public | List programs, optionally filtered by company |
| GET    | `/programs/:id`        | Public | Get a single program                          |
| POST   | `/programs`            | Admin  | Create a program                              |
| PATCH  | `/programs/:id`        | Admin  | Update a program                              |
| DELETE | `/programs/:id`        | Admin  | Delete a program                              |

```ts
programsApi.getAll(companyId?);
programsApi.getById(id);
programsApi.create({ company_id, title, description?, category?, duration_minutes });
programsApi.update(id, { title?, description?, category?, duration_minutes? });
programsApi.delete(id);
```

---

## Memberships — `/memberships`

**File:** `src/api/memberships/route.ts`

| Method | Endpoint                  | Access | Description                                      |
| ------ | ------------------------- | ------ | ------------------------------------------------ |
| GET    | `/memberships?companyId=` | Public | List memberships, optionally filtered by company |
| GET    | `/memberships/:id`        | Public | Get a single membership                          |
| GET    | `/memberships/my`         | Member | Get current user's memberships                   |
| POST   | `/memberships`            | Admin  | Create a membership plan                         |
| PATCH  | `/memberships/:id`        | Admin  | Update a membership plan                         |
| DELETE | `/memberships/:id`        | Admin  | Delete a membership plan                         |
| POST   | `/memberships/:id/assign` | Admin  | Assign membership to a user                      |

```ts
membershipsApi.getAll(companyId?);
membershipsApi.getById(id);
membershipsApi.getMy();
membershipsApi.create({ company_id, title, description?, price });
membershipsApi.update(id, { title?, description?, price? });
membershipsApi.delete(id);
membershipsApi.assign(id, { user_id, start_date, end_date });
```

---

## Classes — `/classes`

**File:** `src/api/classes/route.ts`

| Method | Endpoint              | Access | Description                                  |
| ------ | --------------------- | ------ | -------------------------------------------- |
| GET    | `/classes?companyId=` | Public | List classes, optionally filtered by company |
| GET    | `/classes/:id`        | Public | Get a single class                           |
| POST   | `/classes`            | Admin  | Create a class                               |
| PATCH  | `/classes/:id`        | Admin  | Update a class                               |
| DELETE | `/classes/:id`        | Admin  | Delete a class                               |

```ts
classesApi.getAll(companyId?);
classesApi.getById(id);
classesApi.create({ company_id, professional_id, program_id, title, date, start_time, end_time, max_seats });
classesApi.update(id, { professional_id?, program_id?, title?, date?, start_time?, end_time?, max_seats? });
classesApi.delete(id);
```

---

## Bookings — `/bookings`

**File:** `src/api/bookings/route.ts`

| Method | Endpoint               | Access | Description                 |
| ------ | ---------------------- | ------ | --------------------------- |
| GET    | `/bookings/my`         | Member | Get current user's bookings |
| POST   | `/bookings`            | Member | Book a class                |
| PATCH  | `/bookings/:id/cancel` | Member | Cancel a booking            |
| GET    | `/bookings`            | Admin  | List all bookings           |

```ts
bookingsApi.getMy();
bookingsApi.create({ class_id });
bookingsApi.cancel(id);
bookingsApi.getAll();
```

---

## Settings — `/settings`

**File:** `src/api/settings/route.ts`

| Method | Endpoint               | Access | Description             |
| ------ | ---------------------- | ------ | ----------------------- |
| GET    | `/settings/:companyId` | Public | Get company settings    |
| PATCH  | `/settings/:companyId` | Admin  | Update company settings |

```ts
settingsApi.get(companyId);
settingsApi.update(companyId, { gym_status?, announcement? });
```

---

## Auth Context

`AuthProvider` wraps the app in `src/index.tsx`. Use the `useAuth` hook anywhere inside it:

```ts
import { useAuth } from "../context/AuthContext";

const { user, isAuthenticated, isLoading, login, register, logout } = useAuth();
```

On mount, `AuthProvider` calls `/users/me` to restore the session if a token exists in localStorage. If the token is expired it will be refreshed automatically; if refresh also fails the tokens are cleared.

---

## Types

All TypeScript interfaces live in `src/api/types.ts` and are re-exported from `src/api/index.ts`.

| Interface                                                          | Used for                  |
| ------------------------------------------------------------------ | ------------------------- |
| `AuthResponse`                                                     | Login / register response |
| `LoginDto` / `RegisterDto`                                         | Auth request bodies       |
| `User` / `UpdateUserDto`                                           | User entity               |
| `Company` / `CreateCompanyDto` / `UpdateCompanyDto`                | Company entity            |
| `Professional` / `CreateProfessionalDto` / `UpdateProfessionalDto` | Trainer entity            |
| `Program` / `CreateProgramDto` / `UpdateProgramDto`                | Program entity            |
| `Membership` / `CreateMembershipDto` / `UpdateMembershipDto`       | Membership plan           |
| `UserMembership` / `AssignMembershipDto`                           | User ↔ membership join    |
| `Class` / `CreateClassDto` / `UpdateClassDto`                      | Scheduled class           |
| `Booking` / `CreateBookingDto`                                     | Booking entity            |
| `Settings` / `UpdateSettingsDto`                                   | Company settings          |
