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
COPY package*.json ./
RUN npm install

# Stage 2 Dev environment
FROM base AS dev
COPY . .
CMD ["npm", "run", "dev"]

# Stage 3: Produccion environment
FROM node:22-bookworm-slim AS prod

WORKDIR /app

COPY --from=base /app /app
COPY . .

RUN npm run build && npm prune --production

CMD ["npm", "start"]
