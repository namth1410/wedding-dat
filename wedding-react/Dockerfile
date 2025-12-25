# Stage 1: Build the React application
FROM node:20-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built artifacts from the builder stage to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (internal container port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
