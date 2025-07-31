# Stage 1: Builder base
FROM node:22-alpine AS base

RUN apk add --update bash git starship && rm -rf /var/cache/apk/*

# Starship prompt
RUN echo 'eval "$(starship init bash)"' >> ~/.bashrc

WORKDIR /app

# Limpia caché de npm antes de instalar
RUN npm cache clean --force

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias con configuración más robusta
RUN npm install

# Stage 2: Dev environment
FROM base AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Stage 3: Produccion environment
FROM node:22-alpine AS prod
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY . .
RUN npm run build && npm prune --production
EXPOSE 5173
ENV NODE_ENV=production
CMD ["npm", "start"]
