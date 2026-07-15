# Frontend Docker Build Context Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `frontend/Dockerfile` build successfully when Easypanel uses `frontend` as its Docker build context.

**Architecture:** Keep multi-stage Nuxt static-generation and NGINX runtime image unchanged. Correct only `COPY` source paths so each path is relative to Docker build context `frontend`.

**Tech Stack:** Docker, Node.js 22 Alpine, Nuxt 3 static generation, NGINX 1.27 Alpine.

## Global Constraints

- Docker build context is `frontend`.
- Keep `npm ci` and `npm run generate` build commands unchanged.
- Keep NGINX final image and output copy destination unchanged.
- Do not change Easypanel configuration.

---

### Task 1: Correct frontend build-context paths

**Files:**
- Modify: `frontend/Dockerfile:5-13`
- Test: Docker build with `frontend` context

**Interfaces:**
- Consumes: Files in `frontend/`: `package.json`, lockfile, Nuxt source, `nginx.conf`.
- Produces: Docker image with `/usr/share/nginx/html` populated from `/app/.output/public`.

- [ ] **Step 1: Confirm current paths fail with frontend context**

Run:

```bash
docker build -f frontend/Dockerfile frontend
```

Expected: failure before build stage because `COPY frontend/package*.json` and `COPY frontend/nginx.conf` attempt to read non-existent `frontend/frontend/...` paths.

- [ ] **Step 2: Change `COPY` paths to be relative to context**

Replace `frontend/Dockerfile` with:

```dockerfile
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run generate

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 80
```

- [ ] **Step 3: Build image with same context Easypanel uses**

Run:

```bash
docker build -f frontend/Dockerfile frontend
```

Expected: successful build with `npm ci`, `npm run generate`, and NGINX static output copy completed.

- [ ] **Step 4: Inspect working tree**

Run:

```bash
git status --short
git diff -- frontend/Dockerfile
```

Expected: only three source-path changes in `frontend/Dockerfile`, plus approved process documentation files if present.

- [ ] **Step 5: Commit**

Do not commit unless user explicitly asks. If requested:

```bash
git add frontend/Dockerfile
git commit -m "fix: use frontend Docker build context"
```
