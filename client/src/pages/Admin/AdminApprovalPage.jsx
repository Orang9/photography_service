import { useEffect, useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

export default function AdminApprovalPage() {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/transactions');
        const data = await res.json();
        if (data.success) {
          // Menyaring transaksi yang menunggu persetujuan jadwal
          const waiting = data.data.filter(t => t.raw_status === "awaiting_schedule_approval" || t.status === "Waiting Schedule Approval" || t.status === "Menunggu Persetujuan");
          
          // Memformat data untuk ditampilkan pada antarmuka
          const formatted = waiting.map(t => {
            const rawId = t.id.replace('#TRX-', '');
            return {
              id: rawId,
              order_code: `BK-2025-${rawId.padStart(3, '0')}`,
              client_name: t.client_name,
              package_name: t.package_name || "Custom",
              date: t.transaction_date,
              time: "-", // Waktu tergabung dalam string lokasi
              location: t.location || "-",
              status: "waiting",
              raw_status: t.status
            };
          });
          setSchedules(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const handleApprove = async (id) => {
    try {
      // Mengubah status menjadi unpaid agar client dapat membayar DP
      const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'unpaid' })
      });
      if (res.ok) {
        alert(`Jadwal untuk Order #${id} disetujui. Client sekarang dapat mengunggah bukti pembayaran.`);
        setSchedules((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "approved" } : item
          )
        );
      } else {
        alert('Gagal menyetujui jadwal');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
      if (res.ok) {
        setSchedules((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "rejected" } : item
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#E8D4C3] min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-2">📋 Persetujuan Jadwal</h1>
      <p className="text-sm text-gray-600 mb-8">
        Daftar jadwal pemotretan dari client yang menunggu persetujuan
      </p>

      <div className="space-y-6">
        {schedules.map((item) => (
          <Card key={item.id} className="flex justify-between items-center">
            <div className="space-y-1 text-sm">
              <h3 className="font-bold text-lg">Order #{item.order_code}</h3>
              <p>Client: {item.client_name}</p>
              <p>Paket: {item.package_name}</p>
              <p>
                Tanggal: {item.date} — {item.time}
              </p>
              <p>Lokasi: {item.location}</p>
              <p className="italic text-xs mt-2">Status: {item.status}</p>
            </div>

            {item.status === "waiting" ? (
              <div className="flex gap-3">
                <Button
                  className="bg-green-600 text-white"
                  onClick={() => handleApprove(item.id)}
                >
                  Approve
                </Button>
                <Button
                  className="bg-red-600 text-white"
                  onClick={() => handleReject(item.id)}
                >
                  Reject
                </Button>
              </div>
            ) : (
              <span
                className={`px-4 py-2 rounded text-sm font-semibold ${
                  item.status === "approved"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {item.status.toUpperCase()}
              </span>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
