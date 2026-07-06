import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InvoiceCard from "../../components/sections/InvoiceCard";
import PaymentStatusBadge from "../../components/sections/PaymentStatusBadge";
import Button from "../../components/common/Button";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("UNPAID");
  const [file, setFile] = useState(null);
  const [isRejected, setIsRejected] = useState(false);
  const [invoice, setInvoice] = useState({
    client: "-",
    service: "-",
    date: "-",
    time: "-",
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/transactions/${id}`);
        const data = await res.json();
        if (data.success) {
          const t = data.data;
          // Mengisi data invoice dari response API
          setInvoice({
            client: t.client_name || "Client",
            service: t.package_name || "Service Package",
            date: t.created_at ? t.created_at.split('T')[0] : "-",
            time: "-",
            total: t.amount || 0,
          });
          
          if (t.status === "awaiting_dp_verification") {
            setStatus("WAITING_VERIFICATION");
          } else if (t.status === "dp_paid" || t.status === "fully_paid") {
            setStatus("PAID");
          } else {
            setStatus("UNPAID");
            if (t.status === "rejected") setIsRejected(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchTransaction();
  }, [id]);

  const handleUpload = async () => {
    if (!file) return alert("Upload bukti pembayaran terlebih dahulu");
    
    // Mengupdate status transaksi menjadi menunggu verifikasi DP
    try {
      const payload = {
        status: "awaiting_dp_verification"
      };
      
      const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setStatus("WAITING_VERIFICATION");
        alert("Bukti pembayaran berhasil diunggah!");
        navigate("/history");
      } else {
        alert("Gagal mengunggah bukti pembayaran.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengunggah bukti pembayaran.");
    }
  };

  if (isLoading) {
    return <div className="max-w-xl mx-auto p-8 text-center text-gray-500">Memuat data pembayaran...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>

      <div className="flex items-center gap-2 mb-6">
        <span>Status Pembayaran:</span>
        <PaymentStatusBadge status={status} />
      </div>

      <InvoiceCard invoice={invoice} />

      {isRejected && status === "UNPAID" && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm font-medium">
          ⚠️ Pembayaran Anda sebelumnya ditolak. Silakan unggah ulang bukti pembayaran yang valid.
        </div>
      )}

      {status === "UNPAID" && (
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-3 rounded"
          />

          <Button className="w-full py-3" onClick={handleUpload}>
            Upload Bukti Pembayaran
          </Button>
        </div>
      )}

      {status === "WAITING_VERIFICATION" && (
        <p className="text-yellow-700 text-sm mt-4">
          Bukti pembayaran telah dikirim dan sedang menunggu verifikasi admin.
        </p>
      )}

      {status === "PAID" && (
        <p className="text-green-700 text-sm mt-4">
          Pembayaran telah diverifikasi. Terima kasih 🙏
        </p>
      )}
    </div>
  );
}
