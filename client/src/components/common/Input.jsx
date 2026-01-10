export default function Input({ label, type = "text", placeholder, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 font-heading">
        {label}
      </label>
      <input
        type={type}
        className="w-full px-4 py-3 rounded-lg border border-[#6B7280] focus:ring-2 focus:ring-[#13273F] focus:border-[#13273F] outline-none transition-all"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
