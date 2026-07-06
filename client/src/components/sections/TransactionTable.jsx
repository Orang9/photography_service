import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import TransactionStatusBadge from '../common/TransactionStatusBadge';

export default function TransactionTable({ data, onCekClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesSearch = row.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            row.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Semua Status' || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 delay-100 fill-mode-both">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm" 
            placeholder="Cari no. pesanan atau nama klien..." 
          />
        </div>
        
        <div className="relative w-full md:w-64 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none shadow-sm cursor-pointer hover:border-gray-300 transition-all text-slate-700 font-medium">
            <option value="Semua Status">Semua Status</option>
            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            <option value="DP Terverifikasi">DP Terverifikasi</option>
            <option value="Lunas">Lunas</option>
            <option value="Batal">Batal</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-slate-50/80 backdrop-blur-sm">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID Pesanan</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Klien</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Paket</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                    Tidak ada data transaksi yang sesuai.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.package}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{row.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TransactionStatusBadge status={row.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {row.status === 'Menunggu Verifikasi' ? (
                        <button 
                          onClick={() => onCekClick(row)}
                          className="inline-flex items-center px-3.5 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm text-sm group-hover:shadow-md"
                        >
                          <Eye size={16} className="mr-1.5" />
                          CEK
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-3.5 py-1.5 text-gray-400 cursor-not-allowed text-sm bg-gray-50 rounded-lg border border-transparent">
                          <Eye size={16} className="mr-1.5" />
                          DETAIL
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-slate-500">Menampilkan {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} hingga {Math.min(currentPage * itemsPerPage, filteredData.length)} dari {filteredData.length} data</span>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md text-sm transition-colors ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              Sebelumnya
            </button>
            <button 
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || totalPages === 0}
              className={`px-3 py-1 border rounded-md text-sm transition-colors ${currentPage >= totalPages || totalPages === 0 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
