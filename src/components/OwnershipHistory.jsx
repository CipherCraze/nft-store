import { shortenAddress, formatDate } from "../utils/formatEth";

export default function OwnershipHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="p-6 bg-[#0a0a0f]/50 border border-[#00fff9]/10 rounded-lg">
        <p className="text-gray-500 text-center">No ownership history available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3
        className="text-xl font-bold text-white mb-4"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        Ownership Timeline
      </h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00fff9] via-[#ff006e] to-[#8338ec]"></div>

        {/* Ownership records */}
        <div className="space-y-6">
          {history.map((record, index) => (
            <div key={index} className="relative pl-16">
              {/* Timeline dot */}
              <div
                className="absolute left-4 w-4 h-4 rounded-full border-2 border-[#0a0a0f]"
                style={{
                  backgroundColor:
                    index === 0
                      ? "#00fff9"
                      : index === history.length - 1
                      ? "#8338ec"
                      : "#ff006e",
                  boxShadow: `0 0 20px ${
                    index === 0
                      ? "#00fff9"
                      : index === history.length - 1
                      ? "#8338ec"
                      : "#ff006e"
                  }`,
                }}
              ></div>

              {/* Record card */}
              <div className="p-4 bg-[#0a0a0f]/50 border border-[#00fff9]/10 rounded-lg hover:border-[#00fff9]/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {index === 0 ? "Current Owner" : `Previous Owner ${history.length - index}`}
                    </div>
                    <div className="text-sm font-mono text-[#00fff9]">
                      {shortenAddress(record.owner, 8, 6)}
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 bg-[#ff006e]/10 border border-[#ff006e]/30 rounded-full text-xs font-bold text-[#ff006e]"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    Level {record.level.toString()}
                  </div>
                </div>

                {record.timestamp && (
                  <div className="text-xs text-gray-600 mt-2">
                    {formatDate(Number(record.timestamp))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats footer */}
      <div className="mt-6 pt-4 border-t border-[#00fff9]/10 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Total Owners
          </div>
          <div
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {history.length}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Current Level
          </div>
          <div
            className="text-2xl font-bold text-[#00fff9]"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {history[0]?.level.toString() || "0"}
          </div>
        </div>
      </div>
    </div>
  );
}
