# Base stage for all services
FROM node:20 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Build stage
FROM base AS build
COPY . .
RUN npm run build

# Production stage
FROM node:20-slim AS production

# Accept build arguments
ARG SERVICE_NAME
ARG PORT
ARG NODE_ENV
ARG JWT_SECRET
ARG JWT_EXPIRES_IN
ARG AUTH_SERVICE_HOST
ARG AUTH_SERVICE_PORT
ARG CLIENT_BACKEND_HOST
ARG CLIENT_BACKEND_TCP_PORT
ARG MONGO_HOST
ARG MONGO_PORT
ARG MONGO_DATABASE
ARG MONGO_DB
ARG MONGO_SSL

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV SERVICE_NAME=${SERVICE_NAME}
ENV PORT=${PORT}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
ENV AUTH_SERVICE_HOST=${AUTH_SERVICE_HOST}
ENV AUTH_SERVICE_PORT=${AUTH_SERVICE_PORT}
ENV CLIENT_BACKEND_HOST=${CLIENT_BACKEND_HOST}
ENV CLIENT_BACKEND_TCP_PORT=${CLIENT_BACKEND_TCP_PORT}
ENV MONGO_HOST=${MONGO_HOST}
ENV MONGO_PORT=${MONGO_PORT}
ENV MONGO_DATABASE=${MONGO_DATABASE}
ENV MONGO_DB=${MONGO_DB}
ENV MONGO_SSL=${MONGO_SSL}

WORKDIR /usr/src/app

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=build /usr/src/app/dist ./dist

# Expose configured port
EXPOSE ${PORT}

# Start with service name for better container identification
CMD ["node", "dist/main"]