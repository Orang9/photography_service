// src/pages/BookingPage.jsx
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import { servicesData, formatRupiah } from "../../data/services";
import { generateTimeOptions } from "../../utils/timeOptions";
import { getPackages } from "../../services/packageService"

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [step, setStep] = useState(1); // 1: Select Service, 2: Select Package, 3: Details

  useEffect(() => {
  const fetchPackages = async () => {
    try {
      const res = await getPackages();
      // res = { success: true, data: [...] }
      setPackages(res.data);
    } catch (err) {
      console.error("Gagal mengambil package:", err);
    }
  };

  fetchPackages();
}, []);

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
              <div
                key="wisuda"
                onClick={() => handleServiceSelect(service)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  "wisuda" === "wisuda"
                    ? "bg-[#13273F] text-white border-[#13273F] shadow-md"
                    : "bg-white border-[#6B7280] hover:border-[#13273F]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>🎓</span>
                  <span className="font-medium">Wisuda & Graduation</span>
                </div>
              </div>
              <div
                key="walimah"
                onClick={() => handleServiceSelect(service)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  "walimah" === "walimah"
                    ? "bg-[#13273F] text-white border-[#13273F] shadow-md"
                    : "bg-white border-[#6B7280] hover:border-[#13273F]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>💍</span>
                  <span className="font-medium">Walimah & Pernikahan</span>
                </div>
              </div>
              <div
                key="event"
                onClick={() => handleServiceSelect(service)}
                className={`p-4 rounded-lg cursor-pointer border transition-all ${
                  "event" === "event"
                    ? "bg-[#13273F] text-white border-[#13273F] shadow-md"
                    : "bg-white border-[#6B7280] hover:border-[#13273F]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>mic</span>
                  <span className="font-medium">Organisasi & Sekolah</span>
                </div>
              </div>
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

                  <form>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Tanggal Pemotretan" type="date" />
                      <select className="w-full border p-3 rounded">
                        {generateTimeOptions().map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Lokasi Pemotretan"
                      placeholder="Alamat lengkap lokasi..."
                    />
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#1F2937] mb-1 font-heading">
                        Catatan Tambahan
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border border-[#6B7280] focus:ring-2 focus:ring-[#13273F] outline-none h-24"
                        placeholder="Request khusus, mood foto, dll..."
                      ></textarea>
                    </div>

                    <Link to="/history">
                      <button
                        variant="[#13273F]"
                        className="w-full py-3 mt-4 text-lg"
                      >
                        Konfirmasi Booking
                      </button>
                    </Link>
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
