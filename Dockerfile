# 1. Deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# 2. Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# --- ДОБАВЛЕННЫЕ СТРОКИ НАЧАЛО ---
# Принимаем аргумент из команды docker build
ARG NEXT_PUBLIC_YMAPS_API_KEY
# Превращаем его в переменную окружения для момента сборки (npm run build)
ENV NEXT_PUBLIC_YMAPS_API_KEY=$NEXT_PUBLIC_YMAPS_API_KEY
# --- ДОБАВЛЕННЫЕ СТРОКИ КОНЕЦ ---

RUN npm run build

# 3. Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]