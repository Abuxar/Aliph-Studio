# syntax=docker/dockerfile:1

# =============================================================
# Aliph Studio — production image for the Hostinger VPS.
#
# Relies on `output: "standalone"` in next.config.ts, which emits a
# self-contained server with only the modules actually imported. The final
# image lands around 200MB rather than the ~1.2GB a naive copy produces.
#
# Vercel ignores this file entirely.
# =============================================================

# ---------- deps ----------
FROM node:24-alpine AS deps
WORKDIR /app

# Install against the lockfile only, so a dependency cannot drift between
# your machine and the server.
COPY package.json package-lock.json ./
RUN npm ci

# ---------- builder ----------
FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so
# the canonical origin has to be present HERE, not just at runtime.
ARG NEXT_PUBLIC_SITE_URL=https://aliph.studio
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- runner ----------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Never run the app as root.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# `public` holds static assets; the standalone server does not inline them.
COPY --from=builder /app/public ./public

# The standalone bundle already carries its own minimal node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Compose and orchestrators read this to know when the container is live.
HEALTHCHECK --interval=30s --timeout=4s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
