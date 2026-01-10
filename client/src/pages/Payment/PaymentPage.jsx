import { useState } from "react";
import InvoiceCard from "../../components/sections/InvoiceCard";
import PaymentStatusBadge from "../../components/sections/PaymentStatusBadge";
import Button from "../../components/common/Button";

export default function PaymentPage() {
  const [status, setStatus] = useState("UNPAID");
  const [file, setFile] = useState(null);

  const invoice = {
    client: "Ahmad Fauzi",
    service: "Wisuda - Paket Al Burhan",
    date: "10 Januari 2026",
    time: "09.00",
    total: 350000,
  };

  const handleUpload = () => {
    if (!file) return alert("Upload bukti pembayaran terlebih dahulu");
    setStatus("WAITING_VERIFICATION");
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>

      <div className="flex items-center gap-2 mb-6">
        <span>Status Pembayaran:</span>
        <PaymentStatusBadge status={status} />
      </div>

      <InvoiceCard invoice={invoice} />

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
