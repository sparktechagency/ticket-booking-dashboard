export function ActiveEvents({ events, activeEvents }) {
  return (
    <div className="bg-gradient-to-br from-[#6d1db9]/10 via-[#080014] to-[#030a1d]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-white font-display">Active Events</h3>
        <span className="text-[#bd85f1] font-display">{activeEvents}</span>
      </div>
      <div className="space-y-3">
        {events
          .filter((e) => new Date(e.date) > new Date())
          .slice(0, 4)
          .map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-sans text-sm truncate">
                  {event.title}
                </p>
                <p className="text-xs text-[#99a1af] font-sans">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#bd85f1] font-display">
                  {event.ticketCategories.reduce(
                    (sum, cat) => sum + cat.availableQuantity,
                    0
                  )}{" "}
                  tickets left
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
