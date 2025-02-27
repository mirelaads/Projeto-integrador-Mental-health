# Etapa de build
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Etapa final
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY .env ./
RUN npm install --only=production && npm cache clean --force

ENV NODE_ENV=production

# Adicione um usuário não root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "dist/server.js"]