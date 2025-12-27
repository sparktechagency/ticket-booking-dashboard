import { FaArrowUp } from "react-icons/fa";

export function StatCard({ icon, value, label, growth, color }) {
  console.log(color);
  return (
    <div className="bg-gradient-to-br from-[${color}/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#bd85f1]/30 transition-all group">
      <div className="flex justify-between mb-4">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${color}20`,
            color: `${color}ff`,
          }}
        >
          <p className="text-xl">{icon}</p>
        </div>
        {growth && (
          <span className="text-green-400 text-sm flex items-center gap-1">
            <FaArrowUp className="w-4 h-4" /> +{growth}%
          </span>
        )}
      </div>
      <p className="text-3xl text-white">{value}</p>
      <p className="text-sm text-[#99a1af]">{label}</p>
    </div>
  );
}
