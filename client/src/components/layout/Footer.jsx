export default function Footer() {
  return (
    <footer className="bg-[#13273F] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold font-heading mb-4">aynfaal.</h3>
            <p className="text-[#E8D4C3] max-w-sm mb-6">
              Jasa fotografi profesional dengan sentuhan Islami. Mengabadikan
              momen berharga Anda dengan elegan dan penuh makna.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-[#E8D4C3]">
              <li>Wisuda & Graduation</li>
              <li>Walimah Syar'i</li>
              <li>Produk UMKM</li>
              <li>Dokumentasi Event</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-[#E8D4C3]">
              <li>Assalamualaikum@aynfaal.id</li>
              <li>+62 812-3456-7890</li>
              <li>Bekasi, Jawa Barat</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#5C4033] pt-8 text-center text-[#6B7280] text-sm">
          &copy; 2024 aynfaal Photography. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
