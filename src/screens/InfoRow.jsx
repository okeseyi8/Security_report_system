export const InfoRow = ({ label, value, valueClass = "text-[15px] font-medium" }) => (
  <div className="flex items-start gap-6">
    <h3 className="text-[#64748b] font-semibold w-[120px]">{label}</h3>
    <p className={`${valueClass} text-[#1e293b]`}>{value}</p>
  </div>
);