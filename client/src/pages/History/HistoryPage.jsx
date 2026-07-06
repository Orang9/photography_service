import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

export default function HistoryPage() {
  const { user } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`http://localhost:3000/api/transactions/user/${user.id}`);
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user]);
  const handleSubmitReview = async () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("Rating dan ulasan wajib diisi");
      return;
    }

    try {
      const payload = {
        portfolio_id: "ID_PORTFOLIO_DARI_ORDER",
        customer_name: "Client Name",
        rating: rating,
        description: reviewText,
      };

      console.log("DATA REVIEW:", payload);

      setShowReviewModal(false);
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-12 max-w-5xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-1">Riwayat Pesanan</h1>
      <p className="text-sm text-gray-500 mb-8 underline">
        Daftar Semua Pemotretan Anda
      </p>

      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Memuat riwayat...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border border-dashed border-gray-300">
            Anda belum memiliki riwayat pesanan.
          </div>
        ) : (
          orders.map((order, idx) => (
            <div
              key={idx}
              className="border border-black/40 p-6 flex justify-between"
            >
            {/* Informasi Detail Pemotretan */}
            <div className="space-y-1 text-sm">
              <h3 className="font-bold text-lg mb-2">Order {order.id}</h3>
              <p>{order.date}</p>
              <p>Paket: {order.package_name || "Custom"}</p>
              <p>Lokasi: {order.location || "-"}</p>
              <p>Total: Rp {Number(order.total)?.toLocaleString('id-ID') || "-"}</p>

              {order.status === "Waiting Payment" && (
                <p className="text-xs mt-2 italic text-red-500">Silakan selesaikan pembayaran DP</p>
              )}
            </div>

            {/* Bagian Status dan Aksi */}
            <div className="flex flex-col justify-between items-end">
              {/* Label Status */}
              <span className="text-xs border border-black px-3 py-1">
                {order.status}
              </span>

              {/* Tombol Aksi Berdasarkan Status */}
              <div className="flex gap-2 mt-4">
                {(order.status === "Waiting Payment" || order.status === "Payment Rejected") && (
                  <Link to={`/payment/${order.id.replace('BK-', '').split('-')[1]}`}>
                    <Button className="bg-[#4D4D4D] text-white px-6 py-2 text-sm rounded shadow-sm hover:bg-black">
                      Upload Bukti
                    </Button>
                  </Link>
                )}

                {order.status === "Complete" && (
                  <>
                    <Button
                      onClick={() => setShowReviewModal(true)}
                      className="bg-[#4D4D4D] text-white px-6 py-2 text-sm rounded shadow-sm hover:bg-black"
                    >
                      Review
                    </Button>
                    <button className="bg-[#4D4D4D] text-white px-6 py-2 text-sm rounded shadow-sm hover:bg-black">
                      Download Foto
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          ))
        )}
      </div>
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Beri Review</h2>

            {/* STAR RATING */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* REVIEW TEXT */}
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tulis ulasan Anda..."
              className="w-full border border-gray-300 p-2 text-sm mb-4 focus:outline-none"
              rows={4}
            />

            {/* ACTION BUTTON */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-sm border"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 text-sm bg-black text-white"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
