FROM node:20-alpine

WORKDIR /app

# Copy package files and Prisma schema
COPY package*.json ./
COPY prisma ./prisma

# Build arguments for environment variables
ARG DATABASE_URL
ARG NEON_AUTH_BASE_URL
ARG NEXT_PUBLIC_NEON_AUTH_BASE_URL
ARG NEXT_PUBLIC_APP_URL

ENV DATABASE_URL=${DATABASE_URL}
ENV NEON_AUTH_BASE_URL=${NEON_AUTH_BASE_URL}
ENV NEXT_PUBLIC_NEON_AUTH_BASE_URL=${NEXT_PUBLIC_NEON_AUTH_BASE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

# Install dependencies (this will run postinstall and generate Prisma Client)
RUN npm ci

# Copy application files
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
