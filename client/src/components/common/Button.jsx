export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyle =
    "px-6 py-2.5 rounded-lg font-heading font-medium transition-all duration-200 transform active:scale-95";
  const variants = {
    primary:
      "bg-[#13273F] text-white hover:bg-[#4E0000] shadow-lg shadow-[#E8D4C3]",
    outline: "border-2 border-[#13273F] text-[#13273F] hover:bg-[#E8D4C3]",
    accent: "bg-[#4E0000] text-white hover:bg-[#5C4033]",
    text: "text-[#1F2937] hover:text-[#13273F]",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
