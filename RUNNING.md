# Running Plumtek

This guide explains how to start the Plumtek frontend and backend for development.

## Prerequisites

- Node.js 18+
- MySQL 8.0+ or MariaDB 10.5+
- npm or Yarn

## Quick Start

Both frontend and API now start with a single command:

```sh
npm install
npm run dev
```

This starts:
- **Frontend**: Vite dev server at http://localhost:8080
- **Backend**: API server at http://localhost:8787

The frontend automatically proxies `/api/*` requests to the backend.

## Configuration

### Frontend (.env.local)

Create `.env.local` in the project root:

```env
VITE_API_URL=http://localhost:8787
```

For production, update to your production API URL:

```env
VITE_API_URL=https://api.plumtek.com
```

### Backend (.env)

Copy `.env.example` to `.env` and configure:

```sh
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=plumtek_catalog

# JWT Secret (change in production!)
ADMIN_JWT_SECRET=change-this-in-production-to-a-strong-secret

# CORS Origins
CORS_ORIGIN=http://localhost:5173,http://localhost:8080
```

## Scripts

- `npm run dev` — Start frontend + API together
- `npm run api` — Start only the API server
- `npm run build` — Build frontend for production
- `npm run lint` — Run ESLint
- `npm test` — Run unit tests
- `npm run test:watch` — Run tests in watch mode

## First-Time Setup

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Create .env file**
   ```sh
   cp .env.example .env
   ```

3. **Configure database in .env**
   - Update DB_HOST, DB_USER, DB_PASSWORD if needed
   - Ensure MySQL/MariaDB is running

4. **Start development server**
   ```sh
   npm run dev
   ```

5. **Access the app**
   - Frontend: http://localhost:8080
   - API health check: http://localhost:8787/api/health

6. **Default admin credentials**
   - Email: `admin@plumtek.com`
   - Password: `admin123`
   - **Change password immediately** after first login

## Development Tips

### Hot Module Replacement (HMR)

Frontend changes auto-refresh in the browser. Backend changes require a restart.

### Database Changes

If you modify `.env.example`, update your `.env` file accordingly.

### Debugging

Enable debug logging:

```env
LOG_LEVEL=debug
```

### Authentication

Admin authentication uses httpOnly cookies (XSS-safe). Never expose tokens to JavaScript:
- Cookies are automatically sent with every authenticated request
- Client-side code never handles the token

## Troubleshooting

### API returns 500 errors

1. Check MySQL is running
2. Verify database credentials in `.env`
3. Check API logs: `npm run api`

### Frontend can't reach API

1. Ensure `VITE_API_URL` in `.env.local` points to your API
2. Check API is running on port 8787
3. Verify CORS_ORIGIN includes your frontend URL in `.env`

### Port already in use

- Frontend (8080): `lsof -i :8080` and kill the process
- API (8787): `lsof -i :8787` and kill the process

### Rate limit errors on enquiries

The API rate-limits enquiry submissions to 5 per IP per 10 minutes. This is intentional to prevent spam.

## Production Deployment

See `server/README.md` for production setup with environment variables:
- Strong JWT secret (32+ characters)
- HTTPS/SSL configuration
- Database backups
- Process management (PM2)

## Security Notes

1. **httpOnly Cookies**: Admin tokens are stored in secure, httpOnly cookies (XSS protection)
2. **CORS**: Restrict to known origins in production
3. **Rate Limiting**: Enquiry endpoint limits to 5 submissions per IP per 10 minutes
4. **Input Validation**: All POST/PUT endpoints validate input server-side
