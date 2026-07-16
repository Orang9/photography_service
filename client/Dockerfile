# Tahap 1: Build Stage (Menggunakan Node.js)
FROM node:22-alpine AS build-stage

WORKDIR /app

# 1. Deklarasikan ARG agar variabel bisa masuk saat build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# 2. Install dependencies
COPY package*.json ./
RUN npm install

# 3. Copy source code & Build
COPY . .
RUN npm run build

# Tahap 2: Production Stage (Menggunakan Nginx)
FROM nginx:stable-alpine

# 1. Copy hasil build dari Tahap 1 ke folder Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 2. Copy konfigurasi Nginx khusus yang sudah kita buat
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

