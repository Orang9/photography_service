import React from 'react';

export default function TransactionStatusBadge({ status }) {
  switch (status) {
    case 'Menunggu Verifikasi':
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          {status}
        </span>
      );
    case 'DP Terverifikasi':
    case 'Lunas':
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          {status}
        </span>
      );
    case 'Batal':
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
          {status}
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
          {status}
        </span>
      );
  }
}
