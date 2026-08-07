# HR & Careers Section - Implementation TODO

## Steps
- [x] Read & understand existing codebase
- [x] Create plan and get approval

### 1. Backend - Database Schema & API
- [x] Update `server/index.mjs` (SQLite) - Add career_applications table + /api/careers/apply endpoint
- [x] Update `server/index-production.mjs` (MySQL) - Add career_applications table + /api/careers/apply endpoint
- [x] Update `server/email.mjs` - Add career application email notification helper

### 2. Frontend - API Client
- [x] Update `src/lib/api.ts` - Add `submitCareerApplication` function

### 3. Frontend - Careers Page
- [x] Create `src/pages/Careers.tsx` - Full career page with application form

### 4. Frontend - Navigation Updates
- [x] Update `src/components/Header.tsx` - Add "Careers" to nav items
- [x] Update `src/components/Footer.tsx` - Add "Careers" to quick links

### 5. Frontend - Routing
- [x] Update `src/App.tsx` - Add lazy-loaded route for /careers

## Done

