// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { formatRupiah } from "../../data/services";
import { useAuth } from "../../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="bg-[#E8D4C3] min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Greeting */}
        <div className="bg-[#13273F] rounded-2xl p-8 text-white mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-heading font-bold mb-2">
              Assalamu'alaikum, {user?.username || user?.fullname || "User"}!
            </h1>
            <p className="text-[#E8D4C3] mb-6">
              Semoga harimu menyenangkan. Siap mengabadikan momen hari ini?
            </p>
            <Link to="/booking">
              <Button
                variant="accent"
                className="text-[#1F2937] font-semibold shadow-none"
              >
                Buat Booking Baru
              </Button>
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl">
            📸
          </div>
        </div>

        {/* Quick Stats / shortcuts */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card className="flex items-center justify-between bg-white border-l-4 border-l-[#13273F]">
            <div>
              <p className="text-sm text-[#6B7280]">Booking Aktif</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">0 Pesanan</h3>
            </div>
            <div className="bg-[#E8D4C3] p-3 rounded-full text-[#13273F]">
              📅
            </div>
          </Card>
          <Card className="flex items-center justify-between bg-white border-l-4 border-l-[#4E0000]">
            <div>
              <p className="text-sm text-[#6B7280]">Voucher Diskon</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">
                Promo Available
              </h3>
            </div>
            <div className="bg-[#E8D4C3] p-3 rounded-full text-[#4E0000]">
              🎟️
            </div>
          </Card>
        </div>

        {/* Popular Packages Preview */}
        <h2 className="text-xl font-heading font-bold text-[#1F2937] mb-6">
          🔥 Paket Populer Bulan Ini
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="text-xs font-bold text-[#13273F] bg-[#E8D4C3] inline-block px-2 py-1 rounded mb-2">
              WISUDA
            </div>
            <h3 className="font-bold text-lg">Paket Al-Hidayah</h3>
            <p className="text-[#6B7280] text-sm mb-4">
              3 Jam Fleksibel Jabodetabek
            </p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#13273F]">
                {formatRupiah(650000)}
              </span>
              <Link to="/booking">
                <Button variant="outline" className="text-xs px-3 py-1">
                  Pilih
                </Button>
              </Link>
            </div>
          </Card>

          <Card>
            <div className="text-xs font-bold text-[#13273F] bg-[#E8D4C3] inline-block px-2 py-1 rounded mb-2">
              UMKM
            </div>
            <h3 className="font-bold text-lg">Paket Branding</h3>
            <p className="text-[#6B7280] text-sm mb-4">
              Konsep Kreatif & Professional
            </p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#13273F]">
                {formatRupiah(550000)}
              </span>
              <Link to="/booking">
                <Button variant="outline" className="text-xs px-3 py-1">
                  Pilih
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
