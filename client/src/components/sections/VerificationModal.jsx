import React, { useState } from 'react';
import { X, Check, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';

export default function VerificationModal({ isOpen, onClose, transactionData, onActionComplete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewState, setViewState] = useState('default'); // 'default', 'rejecting', 'success'
  const [declineReason, setDeclineReason] = useState("");

  // Reset state when modal opens for a new transaction
  React.useEffect(() => {
    if (isOpen) {
      setViewState('default');
      setDeclineReason("");
    }
  }, [isOpen, transactionData]);

  if (!isOpen || !transactionData) return null;

  const handleUpdateStatus = async (status, reason = "") => {
    setIsSubmitting(true);
    try {
      const numericId = transactionData.id.replace('#TRX-', '');
      const bodyData = { status };
      if (reason) {
        bodyData.decline_reason = reason;
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions/${numericId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      
      if (response.ok) {
        onActionComplete();
        if (status === 'dp_paid') {
          setViewState('success');
        } else {
          onClose(); // if rejected, close immediately
        }
      } else {
        console.error('Failed to update transaction status');
        alert("Gagal mengupdate status transaksi.");
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReject = () => {
    if (!declineReason.trim()) {
      alert("Alasan penolakan wajib diisi.");
      return;
    }
    handleUpdateStatus('rejected', declineReason);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={viewState !== 'success' ? onClose : undefined}
      ></div>
      
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in zoom-in-95 duration-300">
          
          {viewState === 'success' ? (
            <div className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verifikasi Berhasil!</h3>
              <p className="text-slate-600 mb-6">Pembayaran DP untuk {transactionData.id} telah disetujui.</p>
              <button 
                onClick={onClose}
                className="w-full inline-flex justify-center items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all focus:outline-none"
              >
                Tutup
              </button>
            </div>
          ) : viewState === 'rejecting' ? (
            <>
              <div className="bg-white px-6 pb-4 pt-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Tolak Pembayaran DP
                </h3>
                <button 
                  onClick={() => setViewState('default')}
                  className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 mb-4">
                  Berikan alasan penolakan agar client dapat memperbaiki dan mengunggah ulang bukti pembayaran.
                </p>
                <textarea
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none h-24 mb-4"
                  placeholder="Contoh: Bukti transfer buram atau nominal tidak sesuai..."
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                />
              </div>
              <div className="bg-slate-50 px-6 py-4 flex flex-row-reverse gap-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="inline-flex w-full justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto transition-all disabled:opacity-50"
                  onClick={handleSubmitReject}
                >
                  {isSubmitting ? 'Memproses...' : 'Tolak Pembayaran'}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto transition-all"
                  onClick={() => setViewState('default')}
                >
                  Batal
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Default View */}
              <div className="bg-white px-6 pb-4 pt-6 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900" id="modal-title">
                      Verifikasi Pembayaran
                    </h3>
                    <p className="mt-1 text-sm font-medium text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded-md">{transactionData.id}</p>
                  </div>
                  <button 
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-200 focus:outline-none transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-white px-6 py-6">
                <p className="text-sm font-semibold text-slate-700 mb-3">Bukti Transfer yang Diunggah:</p>
                <div className="w-full h-64 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 mb-6 relative group overflow-hidden hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer">
                  <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform group-hover:scale-105">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:shadow-md transition-shadow">
                      <ImageIcon size={32} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">struk_m_banking_{transactionData.name.toLowerCase()}.jpg</span>
                    <span className="text-xs text-slate-400 mt-2 bg-white px-2 py-1 rounded-full border border-slate-100">Klik untuk memperbesar</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/30 rounded-xl p-5 flex justify-between items-center border border-blue-100/50 shadow-sm">
                  <div>
                    <p className="text-[11px] text-blue-600 font-bold mb-1 uppercase tracking-wider">Nama Pengirim</p>
                    <p className="text-base font-semibold text-slate-900">{transactionData.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-blue-600 font-bold mb-1 uppercase tracking-wider">Nominal Tagihan</p>
                    <p className="text-xl font-extrabold text-slate-900">Rp 500.000</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isSubmitting}
                  className={`inline-flex w-full justify-center items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm sm:w-auto transition-all ${isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'}`}
                  onClick={() => handleUpdateStatus('dp_paid')}
                >
                  <Check size={18} className="mr-2" />
                  {isSubmitting ? 'Memproses...' : 'Setujui'}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  className={`mt-3 inline-flex w-full justify-center items-center rounded-xl border-2 border-red-500 bg-white px-5 py-2.5 text-sm font-bold text-red-600 shadow-sm sm:mt-0 sm:w-auto transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50'}`}
                  onClick={() => setViewState('rejecting')}
                >
                  <X size={18} className="mr-2" />
                  Tolak
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
