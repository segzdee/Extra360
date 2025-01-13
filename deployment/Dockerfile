FROM node:18-alpine AS quantum_builder

WORKDIR /app

# Establish dependency quantum field
COPY package*.json ./
RUN npm ci

# Initialize TypeScript quantum compiler
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine AS quantum_runtime

WORKDIR /app

# Copy quantum artifacts
COPY --from=quantum_builder /app/dist ./dist
COPY --from=quantum_builder /app/node_modules ./node_modules
COPY package*.json ./

# Establish quantum entrypoint
CMD ["npm", "start"]
