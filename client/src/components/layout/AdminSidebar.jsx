import React from 'react';
import { LayoutDashboard, Receipt, Camera, Image as ImageIcon, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#0f172a] text-white flex-col hidden md:flex h-full shadow-xl z-10">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-wider text-blue-400 flex items-center">
          AL<span className="text-white ml-2 text-sm font-normal">Aynfaal Admin</span>
        </h1>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-1 px-3">
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group">
              <LayoutDashboard size={20} className="mr-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span className="font-medium">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg shadow-md shadow-blue-900/20 transition-colors">
              <Receipt size={20} className="mr-3" />
              <span className="font-medium">Transaksi</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group">
              <Camera size={20} className="mr-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span className="font-medium">Fotografer</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group">
              <ImageIcon size={20} className="mr-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span className="font-medium">Portofolio</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-800 m-3">
        <button className="flex items-center px-4 py-2 w-full text-slate-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors group">
          <LogOut size={20} className="mr-3 text-red-500 group-hover:text-red-400 transition-colors" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
