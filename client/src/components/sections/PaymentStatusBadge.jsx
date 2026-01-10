export default function PaymentStatusBadge({ status }) {
  const styles = {
    UNPAID: "bg-red-100 text-red-700",
    WAITING_VERIFICATION: "bg-yellow-100 text-yellow-700",
    PAID: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
