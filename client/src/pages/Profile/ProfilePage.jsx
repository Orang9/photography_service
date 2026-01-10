export default function ProfilePage() {
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-xl font-bold mb-4">Profil Saya</h1>

      <input className="w-full border p-3 mb-3" placeholder="Nama" />
      <input className="w-full border p-3 mb-3" placeholder="Email" />

      <button className="bg-[#13273F] text-white w-full py-3 rounded">
        Simpan Perubahan
      </button>
    </div>
  );
}
