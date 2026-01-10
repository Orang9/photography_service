// src/pages/ReviewPage.jsx
import React from "react";
import Card from "../../components/common/Card";

const reviews = [
  {
    name: "Sarah Amalia",
    role: "Mahasiswa",
    service: "Wisuda - Paket Al-Hidayah",
    rating: 5,
    comment:
      "MasyaAllah hasilnya bagus banget, fotografernya ramah dan sangat mengarahkan gaya. Sangat recommended!",
  },
  {
    name: "Budi Santoso",
    role: "UMKM Owner",
    service: "Produk - Paket Branding",
    rating: 5,
    comment:
      "Foto produk jadi terlihat sangat profesional. Penjualan saya meningkat setelah ganti foto katalog.",
  },
  {
    name: "Keluarga Pak Hidayat",
    role: "Umum",
    service: "Family - Paket Mawaddah",
    rating: 4,
    comment:
      "Sabar banget menghadapi anak-anak kecil. Hasil fotonya jernih dan tajam.",
  },
];

export default function Reviews() {
  return (
    <div className="bg-[#E8D4C3] py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-heading font-bold text-[#1F2937] mb-4">
            What They Say About Us?
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((rev, idx) => (
            <Card key={idx} className="h-full">
              <div className="flex text-[#4E0000] mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-[#6B7280] mb-6 italic">"{rev.comment}"</p>
              <div className="mt-auto flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8D4C3] flex items-center justify-center text-[#13273F] font-bold">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937]">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-[#6B7280]">{rev.service}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
