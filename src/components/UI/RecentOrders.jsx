import { IoMdAlert } from "react-icons/io";
import { Link } from "react-router-dom";

export function RecentOrders({ orders }) {
  return (
    <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-white font-medium">Recent Orders</h3>
        <Link
          to="/events"
          className="text-[#bd85f1] hover:text-white text-sm font-sans transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.slice(0, 5).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex-1">
                <p className="text-white mb-1">{order.eventTitle}</p>
                <p className="text-sm text-[#99a1af]">
                  {order.customerInfo.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white  font-medium">${order.total}</p>
                <p className="text-xs text-[#99a1af]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <IoMdAlert className="w-12 h-12 text-[#99a1af] mx-auto mb-3 opacity-50" />
            <p className="text-[#99a1af]">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
