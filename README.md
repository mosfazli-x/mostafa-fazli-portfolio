# Portfolio Website

A personal portfolio website with a Nuxt 4 frontend and a Fastify/TypeScript backend.

## Overview

This repository contains a personal portfolio project split into a [Nuxt 4](https://nuxt.com/) frontend (Vue 3, TypeScript, Tailwind CSS) and a [Fastify](https://fastify.dev/) backend (TypeScript). The frontend runs on port 5000 in development (per rontend/nuxt.config.ts) and the backend listens on port 3001 by default (per ackend/src/index.ts).

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [Nuxt 4](https://nuxt.com/) | Framework |
| [Vue 3](https://vuejs.org/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Language |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling (via @tailwindcss/vite) |
| [shadcn-vue](https://www.shadcn-vue.com/) | UI components |
| [reka-ui](https://reka-ui.com/) | UI primitives |
| [@lucide/vue](https://lucide.dev/) | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| [Fastify 5](https://fastify.dev/) | HTTP server |
| [TypeScript](https://www.typescriptlang.org/) | Language |
| [Node.js](https://nodejs.org/) | Runtime (ESM) |

## Architecture Overview

- **Frontend** (rontend/): Nuxt 4 app (port 5000 in dev). Communicates with backend over HTTP.
- **Backend** (ackend/): Fastify server (default port 3001) with a health endpoint at GET /health.

## Repository Structure

`	ext
.
├── backend/           # Fastify/TypeScript API
├── frontend/          # Nuxt 4/Vue 3 application
├── LICENSE            # License with scope/exclusions
├── .gitignore         # Git ignore rules
└── ...                # Reference assets and files
`

## Prerequisites

- [Node.js](https://nodejs.org/) (compatible with modern ESM/TypeScript)
- [pnpm](https://pnpm.io/) (lockfiles pnpm-lock.yaml present in both rontend/ and ackend/)

## Getting Started

### 1) Install dependencies

`ash
# Backend
cd backend
pnpm install

# Frontend
cd ../frontend
pnpm install
`

### 2) Run locally

`ash
# Terminal 1 - Backend (http://localhost:3001)
cd backend
pnpm dev

# Terminal 2 - Frontend (http://localhost:5000)
cd frontend
pnpm dev
`

## Environment Configuration

No .env.example was found in the repository. Environment variables are not documented in source beyond defaults:
- Backend: PORT (defaults to 3001 in ackend/src/index.ts)

Do not commit secrets; if environment variables are needed in the future, add a safe .env.example template.

## Available Scripts

### Frontend (rontend/package.json)
| Script | Command | Purpose |
|--------|---------|---------|
| dev | 
uxt dev | Start dev server (port 5000) |
| uild | 
uxt build | Build for production |
| generate | 
uxt generate | Generate static site |
| preview | 
uxt preview | Preview production build |
| postinstall | 
uxt prepare | Prepare Nuxt types |

### Backend (ackend/package.json)
| Script | Command | Purpose |
|--------|---------|---------|
| dev | 	sx watch src/index.ts | Start dev server with watch |
| uild | 	sc -p tsconfig.json | Compile to dist/ |
| start | 
ode dist/index.js | Run compiled server |
| 	ypecheck | 	sc --noEmit | Type check |

## API Overview

Based on ackend/src/index.ts:
- GET /health → { status: 'ok' }

No other routes were identified in the inspected source.

## Build & Deployment

- **Frontend**: Supports uild and generate (Nuxt). No Dockerfile or deployment config was found.
- **Backend**: Build with 	sc to dist/, run with 
ode dist/index.js. No Dockerfile found.

## License

This project is licensed under the MIT License **for the original application source code only**. Personal materials (résumé/CV, biography/portfolio text, portraits/photos, personal logo/branding/identity assets, other original personal media/content) are **explicitly excluded** and all rights are reserved for those materials, to the extent permitted by applicable law. Third-party libraries/assets remain subject to their respective licenses. See [LICENSE](LICENSE) for full details.

## Author

Project metadata (author/name) not unambiguously present in inspected files.

## Notes on Verification

- Package manager inferred as pnpm from lockfiles.
- Git history has no commits yet (git log returned fatal). No remotes or commit history to infer metadata from.
- Many reference files/assets exist in root (images, HTML references) - some appear to be personal/reference materials.
