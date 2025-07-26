# Stage 1: Builder base
FROM node:22-bookworm-slim AS base

# Instala toolchain y utilidades necesarias
RUN apt-get update && apt-get install -y \
  bash \
  curl \
  git \
  python3 \
  make \
  g++ \
  libc6-dev \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Starship prompt
RUN curl -fsSL https://starship.rs/install.sh | sh -s -- -y \
  && echo 'eval "$(starship init bash)"' >> ~/.bashrc

WORKDIR /app

RUN useradd -m -s /bin/bash dev && echo "dev:dev" | chpasswd && adduser dev sudo

# Limpia caché de npm antes de instalar
RUN npm cache clean --force

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias con configuración más robusta
RUN npm ci --no-audit --no-fund --prefer-offline

# Stage 2: Dev environment
FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage 3: Produccion environment
FROM node:22-bookworm-slim AS prod
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY . .
RUN npm run build && npm prune --production
EXPOSE 3000
CMD ["npm", "start"]