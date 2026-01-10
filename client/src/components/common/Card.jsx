export default function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}
