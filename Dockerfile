FROM node:20-alpine

# Install ffmpeg and python3 (required for yt-dlp and audio conversion)
RUN apk update && apk add --no-cache ffmpeg python3

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
