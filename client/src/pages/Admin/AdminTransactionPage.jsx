import React, { useState, useEffect } from 'react';
import TransactionTable from '../../components/sections/TransactionTable';
import VerificationModal from '../../components/sections/VerificationModal';

export default function AdminTransactionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`);
      const data = await response.json();
      if (data.success) {
        const mappedData = data.data.map(t => ({
          id: t.id,
          name: t.client_name,
          package: t.package_name,
          date: t.transaction_date,
          status: t.status
        }));
        setTransactions(mappedData);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleCekClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTransaction(null), 200); // Clear after animation
  };

  return (
    <div className="bg-[#E8D4C3] min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-sm text-gray-500 mb-1 font-medium flex items-center gap-2">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Aynfaal Lens</span>
              <span>/</span>
              <span className="text-slate-800">Manajemen Transaksi</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Manajemen Transaksi & Verifikasi
            </h2>
          </div>

          {/* Controls & Table Component */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600"></div>
            </div>
          ) : (
            <TransactionTable data={transactions} onCekClick={handleCekClick} />
          )}
        </div>
      </div>

      {/* Verification Modal Component */}
      <VerificationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        transactionData={selectedTransaction}
        onActionComplete={fetchTransactions}
      />
    </div>
  );
}
