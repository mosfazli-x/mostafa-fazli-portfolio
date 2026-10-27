# Docker

## Build and run with Docker Compose

`ash
docker compose up --build -d
`

- Frontend: http://localhost:5000
- Backend: http://localhost:3001 (health: http://localhost:3001/health)

## Stop

`ash
docker compose down
`

## Build individually

`ash
# Backend
docker build -f backend/Dockerfile -t portfolio-backend .

# Frontend
docker build -f frontend/Dockerfile -t portfolio-frontend .
`

## Notes
- Uses Node 20 Alpine, pnpm with frozen lockfiles.
- Backend runs compiled JS from dist/.
- Frontend runs Nuxt Nitro server from .output/.
- Set environment variables as needed in docker-compose.yml or .env.
