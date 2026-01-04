# Grassroots to Glory

A browser-based soccer management game where you start at a small, randomly generated club and try to climb the divisions. Manage transfers, facilities, finances, fan happiness, and your own managerial reputation.

## Tech stack

- React + Vite (client)
- Node.js + Express (server)
- npm workspaces (monorepo)

## Project structure

- `client/` – React UI
- `server/` – Express API and game logic
- `package.json` (root) – workspaces and shared scripts
- `.gitignore` – Node/React ignores

## Getting started

```bash
# install dependencies for client and server via workspaces
npm install

# run API (port 4000) and client (port 3000) in parallel
npm run dev
