import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";

export default function AdminHomePage() {
  const { user } = useAuth();

  return (
    <div className="bg-[#E8D4C3] min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Greeting */}
        <div className="bg-[#13273F] rounded-2xl p-8 text-white mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-heading font-bold mb-2">
              Assalamu'alaikum, {user?.fullname || user?.username || "Admin"}!
            </h1>
            <p className="text-[#E8D4C3] mb-6">
              Berikut ringkasan aktivitas sistem hari ini.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 text-9xl">
            🛠️
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Booking Pending */}
          <Card className="flex items-center justify-between bg-white border-l-4 border-l-[#4E0000]">
            <div>
              <p className="text-sm text-[#6B7280]">Pengajuan Jadwal</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">3 Menunggu</h3>
            </div>
            <div className="bg-[#E8D4C3] p-3 rounded-full text-[#4E0000]">
              ⏳
            </div>
          </Card>

          {/* Active Orders */}
          <Card className="flex items-center justify-between bg-white border-l-4 border-l-[#13273F]">
            <div>
              <p className="text-sm text-[#6B7280]">Booking Aktif</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">5 Pesanan</h3>
            </div>
            <div className="bg-[#E8D4C3] p-3 rounded-full text-[#13273F]">
              📅
            </div>
          </Card>

          {/* Revenue */}
          <Card className="flex items-center justify-between bg-white border-l-4 border-l-[#0F5132]">
            <div>
              <p className="text-sm text-[#6B7280]">Pendapatan Bulan Ini</p>
              <h3 className="text-2xl font-bold text-[#1F2937]">
                Rp 3.500.000
              </h3>
            </div>
            <div className="bg-[#E8D4C3] p-3 rounded-full text-[#0F5132]">
              💰
            </div>
          </Card>
        </div>

        {/* Shortcut */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-lg mb-2">📋 Kelola Booking</h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Lihat dan setujui jadwal pemotretan dari user.
            </p>
            <Link to="/admin/approvals">
              <Button variant="outline">Lihat Pengajuan</Button>
            </Link>
          </Card>

          <Card>
            <h3 className="font-bold text-lg mb-2">📦 Kelola Paket</h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Tambah, ubah, dan nonaktifkan paket fotografi.
            </p>
            <Link to="/admin/packages">
              <Button variant="outline">Kelola Paket</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
