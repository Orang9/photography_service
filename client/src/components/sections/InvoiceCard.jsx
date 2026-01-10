import { formatRupiah } from "../../data/services";

export default function InvoiceCard({ invoice }) {
  return (
    <div className="border rounded-xl p-5 mb-6 bg-white">
      <h3 className="font-bold mb-3">Invoice Pemesanan</h3>

      <div className="text-sm space-y-1">
        <p>
          Nama Client: <b>{invoice.client}</b>
        </p>
        <p>Layanan: {invoice.service}</p>
        <p>Tanggal: {invoice.date}</p>
        <p>Jam: {invoice.time}</p>
        <p>Total Pembayaran:</p>
        <p className="text-lg font-bold text-[#13273F]">
          {formatRupiah(invoice.total)}
        </p>
      </div>
    </div>
  );
}
