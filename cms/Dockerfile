# Multi-stage Dockerfile for Payload CMS
FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production=false

# Build stage
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Payload types and build
ENV NODE_ENV=production
RUN bun run generate:types && bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 payload

# Copy built application
COPY --from=builder --chown=payload:nodejs /app/.next ./.next
COPY --from=builder --chown=payload:nodejs /app/build ./build
COPY --from=builder --chown=payload:nodejs /app/public ./public
COPY --from=builder --chown=payload:nodejs /app/package.json ./package.json

# Install production dependencies only
COPY --from=deps /app/node_modules ./node_modules

# Create media directory
RUN mkdir -p /app/media && chown -R payload:nodejs /app/media

USER payload

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD bun run -e "fetch('http://localhost:3001/api/access/verify').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["bun", "run", "start"]
