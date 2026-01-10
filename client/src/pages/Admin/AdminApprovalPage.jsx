import { useEffect, useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

export default function AdminApprovalPage() {
  const [schedules, setSchedules] = useState([]);

  // 🔹 Dummy data (nanti ganti API)
  useEffect(() => {
    setSchedules([
      {
        id: 1,
        order_code: "BK-2025-001",
        client_name: "Rahma",
        package_name: "Wisuda Platinum",
        date: "21 Okt 2025",
        time: "10:00",
        location: "UI Depok",
        status: "waiting",
      },
      {
        id: 2,
        order_code: "BK-2025-002",
        client_name: "Ahmad",
        package_name: "Event Documentation",
        date: "23 Okt 2025",
        time: "13:00",
        location: "Jakarta Selatan",
        status: "waiting",
      },
    ]);
  }, []);

  const handleApprove = (id) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
  };

  const handleReject = (id) => {
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
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
