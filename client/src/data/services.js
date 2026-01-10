// src/data/services.js
export const servicesData = [
  {
    id: "wisuda",
    title: "Wisuda & Graduation",
    icon: "🎓",
    packages: [
      { name: "Paket Al-Bayan", price: 200000, desc: "1 Jam, 1 Spot Foto" },
      { name: "Paket Al-Burhan", price: 350000, desc: "2 Jam, 2-3 Spot Foto" },
      {
        name: "Paket Al-Hidayah",
        price: 650000,
        desc: "3 Jam, Fleksibel Jabodetabek",
      },
    ],
  },
  {
    id: "walimah",
    title: "Walimah & Pernikahan",
    icon: "💍",
    packages: [
      { name: "Akad Paket Khidmat", price: 1300000, desc: "Dokumentasi 3 Jam" },
      {
        name: "Walimah Paket Lengkap",
        price: 2500000,
        desc: "Dokumentasi 5 Jam",
      },
    ],
  },
  {
    id: "event",
    title: "Organisasi & Sekolah",
    icon: "mic", // Icon placeholder
    packages: [
      { name: "Paket Muzakarah", price: 400000, desc: "Event 3 Jam" },
      { name: "Paket Ijtima", price: 750000, desc: "Event 5 Jam" },
      { name: "Paket Tawassul", price: 1000000, desc: "Full Day 8 Jam" },
    ],
  },
];

export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
