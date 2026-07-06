import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import { servicesData, formatRupiah } from "../../data/services";
import { generateTimeOptions } from "../../utils/timeOptions";
import { useAuth } from "../../context/AuthContext";

export default function BookingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [step, setStep] = useState(1); // 1: Select Service, 2: Select Package, 3: Details
  
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Harap login terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Menggabungkan lokasi, tanggal, waktu, dan paket untuk disimpan di database
      const combinedLocation = `${formData.location} - ${formData.date} ${formData.time} (${selectedPackage.name})`;
      
      const payload = {
        user_id: user.id,
        location: combinedLocation,
        amount: selectedPackage.price,
        status: "awaiting_schedule_approval"
      };

      const res = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        navigate('/history');
      } else {
        alert("Gagal membuat booking: " + data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Terjadi kesalahan saat memproses booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedPackage(null); // Reset package
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setStep(3);
  };

  return (
    <div className="bg-[#E8D4C3] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-[#13273F] mb-8 text-center">
          Form Pemesanan
        </h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 text-sm font-medium text-[#6B7280]">
          <span className={step >= 1 ? "text-[#13273F]" : ""}>
            1. Pilih Layanan
          </span>
          <span className={step >= 2 ? "text-[#13273F]" : ""}>
            2. Pilih Paket
          </span>
          <span className={step >= 3 ? "text-[#13273F]" : ""}>
            3. Data & Jadwal
          </span>
        </div>

        <div className="grid gap-8">
          {/* Step 1 & 2: Selection Area */}
          <div className="grid md:grid-cols-12 gap-6">
            {/* Sidebar Categories */}
            <div className="md:col-span-4 space-y-3">
              <h3 className="font-bold mb-2 text-[#1F2937]">
                Kategori Layanan
              </h3>
              <div></div>
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`p-4 rounded-lg cursor-pointer border transition-all ${
                    selectedService?.id === service.id
                      ? "bg-[#13273F] text-white border-[#13273F] shadow-md"
                      : "bg-white border-[#6B7280] hover:border-[#13273F]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>{service.icon}</span>
                    <span className="font-medium">{service.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-8">
              {!selectedService ? (
                <Card className="h-full flex items-center justify-center text-[#6B7280] py-12">
                  <p>Silakan pilih kategori layanan di sebelah kiri</p>
                </Card>
              ) : step < 3 ? (
                <div className="space-y-4">
                  <h3 className="font-bold mb-2 text-[#1F2937]">
                    Pilih Paket untuk {selectedService.title}
                  </h3>
                  {selectedService.packages.map((pkg, idx) => (
                    <Card
                      key={idx}
                      className="cursor-pointer hover:border-[#13273F] border border-transparent transition-all group"
                      onClick={() => handlePackageSelect(pkg)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-[#13273F]">
                            {pkg.name}
                          </h4>
                          <p className="text-[#6B7280] text-sm">{pkg.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#13273F]">
                            {formatRupiah(pkg.price)}
                          </p>
                          <span className="text-xs text-[#13273F] underline">
                            Pilih
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                /* Step 3: Form Details */
                <Card className="animate-fade-in">
                  <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div>
                      <h3 className="font-bold text-xl text-[#13273F]">
                        {selectedPackage.name}
                      </h3>
                      <p className="text-sm text-[#6B7280]">
                        {selectedService.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">
                        {formatRupiah(selectedPackage.price)}
                      </p>
                      <button
                        onClick={() => setStep(2)}
                        className="text-xs text-[#4E0000] hover:underline"
                      >
                        Ubah Paket
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleConfirmBooking}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input 
                        label="Tanggal Pemotretan" 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                      />
                      <select 
                        className="w-full border p-3 rounded"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        required
                      >
                        <option value="">Pilih Waktu</option>
                        {generateTimeOptions().map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Lokasi Pemotretan"
                      placeholder="Alamat lengkap lokasi..."
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#1F2937] mb-1 font-heading">
                        Catatan Tambahan
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border border-[#6B7280] focus:ring-2 focus:ring-[#13273F] outline-none h-24"
                        placeholder="Request khusus, mood foto, dll..."
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 mt-4 text-lg bg-[#13273F] text-white rounded-lg font-bold transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1f3b5e]'}`}
                    >
                      {isSubmitting ? 'Memproses...' : 'Konfirmasi Booking'}
                    </button>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
