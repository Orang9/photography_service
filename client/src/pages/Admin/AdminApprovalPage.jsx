import { useEffect, useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { CheckCircle, XCircle } from "lucide-react";

export default function AdminApprovalPage() {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedDeclineId, setSelectedDeclineId] = useState(null);
  const [declineReason, setDeclineReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`);
        const data = await res.json();
        if (data.success) {
          const waiting = data.data.filter(t => t.raw_status === "awaiting_schedule_approval" || t.status === "Waiting Schedule Approval" || t.status === "Menunggu Persetujuan");
          
          const formatted = waiting.map(t => {
            const rawId = t.id.replace('#TRX-', '');
            return {
              id: rawId,
              order_code: `BK-2025-${rawId.padStart(3, '0')}`,
              client_name: t.client_name,
              package_name: t.package_name || "Custom",
              date: t.transaction_date,
              time: "-", 
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'unpaid' })
      });
      if (res.ok) {
        setSuccessMessage(`Jadwal untuk Order #${id} disetujui. Client sekarang dapat mengunggah bukti pembayaran.`);
        setShowSuccessModal(true);
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

  const promptReject = (id) => {
    setSelectedDeclineId(id);
    setDeclineReason("");
    setShowDeclineModal(true);
  };

  const submitReject = async () => {
    if (!declineReason.trim()) {
      alert("Alasan penolakan harus diisi.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/${selectedDeclineId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'rejected',
          decline_reason: declineReason 
        })
      });
      if (res.ok) {
        setSchedules((prev) =>
          prev.map((item) =>
            item.id === selectedDeclineId ? { ...item, status: "rejected" } : item
          )
        );
        setShowDeclineModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#E8D4C3] min-h-screen p-10 relative">
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
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => handleApprove(item.id)}
                >
                  Approve
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => promptReject(item.id)}
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Berhasil!</h3>
            <p className="text-slate-600 mb-6">{successMessage}</p>
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
            >
              Tutup
            </Button>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Tolak Jadwal
              </h3>
              <button onClick={() => setShowDeclineModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Berikan alasan penolakan jadwal ini agar client mengetahui alasannya.
            </p>
            <textarea
              className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none h-24 mb-4"
              placeholder="Contoh: Maaf, jadwal pada tanggal tersebut sudah penuh..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <Button 
                onClick={() => setShowDeclineModal(false)}
                className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button 
                onClick={submitReject}
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Tolak Jadwal"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
