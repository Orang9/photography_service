import React, { useState } from 'react';
import { X, Check, Image as ImageIcon } from 'lucide-react';

export default function VerificationModal({ isOpen, onClose, transactionData, onActionComplete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !transactionData) return null;

  const handleUpdateStatus = async (status) => {
    setIsSubmitting(true);
    try {
      // Parse ID e.g. "#TRX-5" -> "5"
      const numericId = transactionData.id.replace('#TRX-', '');
      const response = await fetch(`http://localhost:3000/api/transactions/${numericId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        onActionComplete();
        onClose();
      } else {
        console.error('Failed to update transaction status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in zoom-in-95 duration-300">
          
          {/* Modal Header */}
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
                className="rounded-full bg-slate-100 p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="bg-white px-6 py-6">
            <p className="text-sm font-semibold text-slate-700 mb-3">Bukti Transfer yang Diunggah:</p>
            
            {/* Image Placeholder */}
            <div className="w-full h-64 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 mb-6 relative group overflow-hidden hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer">
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform group-hover:scale-105">
                <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:shadow-md transition-shadow">
                  <ImageIcon size={32} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">struk_m_banking_{transactionData.name.toLowerCase()}.jpg</span>
                <span className="text-xs text-slate-400 mt-2 bg-white px-2 py-1 rounded-full border border-slate-100">Klik untuk memperbesar</span>
              </div>
            </div>

            {/* Summary Box */}
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

          {/* Modal Footer */}
          <div className="bg-slate-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3 border-t border-slate-100">
            <button
              type="button"
              disabled={isSubmitting}
              className={`inline-flex w-full justify-center items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto transition-all transform active:scale-95 ${isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 hover:shadow-md'}`}
              onClick={() => handleUpdateStatus('dp_paid')}
            >
              <Check size={18} className="mr-2" />
              {isSubmitting ? 'Memproses...' : 'Setujui'}
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              className={`mt-3 inline-flex w-full justify-center items-center rounded-xl border-2 border-red-500 bg-white px-5 py-2.5 text-sm font-bold text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:w-auto transition-all transform active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50 hover:text-red-700'}`}
              onClick={() => handleUpdateStatus('rejected')}
            >
              <X size={18} className="mr-2" />
              Tolak
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
