# Stage 1: Build the Angular frontend
FROM node:22.11 AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npx ng build --configuration=production

# Stage 2: Build the Node.js backend
FROM node:22.11 AS build-backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Stage 3: Final image with Node.js, Nginx, your app, and additional tools
FROM node:22.11 AS production

# Install Nginx, nano, and Angular CLI
RUN apt-get update && \
    apt-get install -y nginx nano && \
    npm install -g @angular/cli && \
    apt-get clean

# Copy built frontend files from the build-frontend stage
COPY --from=build-frontend /app/frontend/dist/frontend/browser /usr/share/nginx/html

# Copy the entire frontend directory for inspection purposes
COPY --from=build-frontend /app/frontend /app/frontend

# Copy backend files from the build-backend stage
WORKDIR /app/backend
COPY --from=build-backend /app/backend ./

# Install only production dependencies for the backend
RUN npm install --production

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose necessary ports
EXPOSE 80
EXPOSE 4200

# Start both Node.js backend and Nginx
CMD ["sh", "-c", "node /app/backend/server.js & nginx -g 'daemon off;'"]
