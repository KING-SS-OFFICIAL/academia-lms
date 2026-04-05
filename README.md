# ACADEMIA — English Edutech Hub

**AI-Powered Learning Management System for English Education**

Built for competitive exams (WBCS, BANK, SSC, CGL) and school boards (CBSE, ICSE, State Boards V-XII).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | NextAuth.js |
| File Storage | Cloudinary |
| AI | Gemini API |
| Charts | Recharts |
| Icons | Lucide React |

## Features

- **Home Page** — Professional institutional landing page with teacher info, courses, and contact
- **Student Portal** — Login/Signup, profile creation, AI-powered English grammar tests
- **AI Quiz Engine** — Gemini API generates 10 MCQs with weak-area focus
- **Leaderboard** — Gamified ranking with podium, badges, and real-time updates
- **Study Materials** — YouTube embeds, PDF viewer, image gallery categorized by class
- **Progress Tracking** — Heatmap, growth chart, performance radar
- **Gamification** — XP system, levels, badges, daily streaks
- **Teacher Dashboard** — Analytics, content management, announcements
- **Admin Panel** — User management, system stats

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/academia-lms.git
cd academia-lms
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required services:
- **Supabase** — Create project at [supabase.com](https://supabase.com), get PostgreSQL connection string
- **Gemini API** — Get key from [Google AI Studio](https://aistudio.google.com/apikey)
- **Cloudinary** — Create account at [cloudinary.com](https://cloudinary.com)

### 4. Set up database

```bash
npx prisma db push
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment (Free)

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

## Project Structure

```
academia-lms/
├── prisma/schema.prisma      # Database schema
├── src/
│   ├── app/                   # Pages & API routes
│   ├── components/            # React components
│   ├── lib/                   # Utilities & configs
│   ├── hooks/                 # Custom hooks
│   └── types/                 # TypeScript types
├── .env.example               # Environment template
└── package.json
```

## License

MIT — Built for ACADEMIA English Edutech Hub
