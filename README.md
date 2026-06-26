# FitReserve

A fitness facility reservation and membership management platform built with React and TypeScript. Members can browse programs, view schedules, book classes with trainers and manage their memberships - all from one place.

---

## Tech Stack

| Layer         | Technology            |
| ------------- | --------------------- |
| Framework     | React 19 + TypeScript |
| Routing       | React Router v7       |
| Styling       | SCSS Modules          |
| State         | React Context API     |
| Notifications | react-hot-toast       |
| Build         | Create React App      |
| Backend       | REST API (Render.com) |

---

## Features

- **Authentication** - register, login, token refresh and logout
- **Programs** - browse fitness programs offered by the facility
- **Schedule** - view weekly class schedules
- **Trainers** - explore trainer profiles and book directly from their page
- **Memberships** - view and purchase membership tiers
- **Bookings** - book and manage class reservations
- **User Dashboard** - view account details, active membership and booking history
- **Responsive Design** - mobile-first layout with a dedicated mobile navbar

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone <repository-url>
cd fitreserve
npm install
```

### Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

| Variable               | Description                            |
| ---------------------- | -------------------------------------- |
| `REACT_APP_API_URL`    | Backend API base URL                   |
| `REACT_APP_PROJECT_ID` | Project identifier used by the backend |
| `PORT`                 | Dev server port (default: `3001`)      |

### Running

```bash
npm start        # Development server on http://localhost:3001
npm run build    # Production build output to /build
npm test         # Run test suite
```

---

## Project Structure

```
fitreserve/
├── public/
│   ├── index.html              # HTML entry point + meta tags
│   ├── manifest.json           # PWA manifest
│   └── fitreserve-logo.svg
│
├── src/
│   ├── App.tsx                 # Route definitions
│   ├── index.tsx               # React root + context providers
│   │
│   ├── pages/                  # Page-level components
│   │   ├── Home/
│   │   ├── Programs/
│   │   ├── Schedule/
│   │   ├── Trainers/
│   │   ├── Membership/
│   │   ├── Login/
│   │   ├── SignUp/
│   │   ├── Dashboard/
│   │   ├── User/
│   │   ├── UserMyMembership/
│   │   ├── PrivacyPolicy/
│   │   └── TermsOfService/
│   │
│   ├── components/             # Atomic design component library
│   │   ├── atoms/              # Button, Title, Paragraph
│   │   ├── molecules/          # Header, Footer, Modal, ProgramCard
│   │   └── organisms/          # Page sections (Landing, Schedule, etc.)
│   │
│   ├── context/                # Global state
│   │   ├── AuthContext.tsx     # Auth state & token management
│   │   ├── AppContext.tsx      # App data & modal control
│   │   └── BookingsContext.tsx
│   │
│   └── api/                    # Backend API client
│       ├── client.ts           # HTTP client with auto token refresh
│       ├── types.ts            # Shared TypeScript types
│       └── */route.ts          # Per-resource API methods
│
├── .env.example
├── tsconfig.json
└── package.json
```

---

## Authentication

- Bearer token-based authentication
- Access tokens expire every 15 minutes; refresh tokens are used automatically
- Tokens are stored in `localStorage` under `fitreserve_access_token` and `fitreserve_refresh_token`

---

## API

The frontend connects to a backend REST API. Full API reference is documented in [API.md](./API.md) and available interactively at `/api/docs` on the backend host.

---

## License

Private - all rights reserved.
