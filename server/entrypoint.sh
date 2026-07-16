#!/bin/sh

# Ubah dari db-photography-service menjadi db-project-kampus
echo "🔍 Menunggu MariaDB (db-project-kampus:3306) siap..."

until nc -z db-project-kampus 3306; do
  echo "⚠️ Database belum siap, mencoba lagi dalam 2 detik..."
  sleep 2
done

echo "✅ MariaDB sudah terkoneksi!"

echo "🚀 Memulai aplikasi backend..."
exec npm start
