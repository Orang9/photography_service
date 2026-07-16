# Gunakan image Node.js versi Alpine
FROM node:22-alpine

# Set folder kerja
WORKDIR /app

# Install library tambahan:
# 1. libc6-compat (opsional jika butuh kompilasi native)
# 2. netcat-openbsd (untuk mengecek ketersediaan database via entrypoint)
RUN apk add --no-cache libc6-compat netcat-openbsd

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies production
RUN npm ci --only=production

# Copy seluruh source code
COPY . .

# Tambahkan script entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Buka port (sesuaikan dengan port backend Anda, misal 3000 atau 5000)
EXPOSE 5000

# GANTI CMD MENJADI ENTRYPOINT
ENTRYPOINT ["/app/entrypoint.sh"]
