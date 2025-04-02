import React, { useState } from "react";

const getWinnersData = () => [
  { id: 1, name: "Amit", prize: "₹1000" },
  { id: 2, name: "Priya", prize: "₹500" },
  { id: 3, name: "Rohan", prize: "₹700" },
  { id: 4, name: "Anjali", prize: "₹1200" },
  { id: 5, name: "Rahul", prize: "₹800" },
  { id: 6, name: "Nobita", prize: "₹600" },
  { id: 7, name: "Suresh", prize: "₹900" },
  { id: 8, name: "Kavita", prize: "₹1100" },
  { id: 9, name: "Vikram", prize: "₹1300" },
  { id: 10, name: "Deepak", prize: "₹1400" },
];

const LudoWinners = () => {
  const [winners] = useState(getWinnersData());
  const [loading] = useState(false);
  const [error] = useState(null);

  // Assign medals to the top 3 winners
  const winnersWithMedals = winners.map((winner, index) => {
    if (index === 0) {
      return { ...winner, icon: "🥇" }; // 1st place
    } else if (index === 1) {
      return { ...winner, icon: "🥈" }; // 2nd place
    } else if (index === 2) {
      return { ...winner, icon: "🥉" }; // 3rd place
    } else {
      return { ...winner, icon: "🏅" }; // Other participants
    }
  });

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-600 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-6">
          <h2 className="text-2xl font-extrabold text-center text-white tracking-wide drop-shadow-lg" style={{padding: "12px"}}>
            🏆 Ludo Winners
          </h2>
        </div>
        {loading && <p className="text-center text-gray-200 py-6">Loading...</p>}
        {error && <p className="text-center text-red-500 py-6">{error}</p>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <div className="max-h-80 overflow-y-auto scrollbar-style">
              <table className="min-w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <tbody>
                  {winnersWithMedals.map((winner) => (
                    <tr
                      key={winner.id}
                      className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
                    >
                      <td className="p-4 text-center text-sm" style={{ padding: "8px" }}>{winner.icon}</td>
                      <td className="p-4 text-center text-sm font-semibold" style={{ padding: "8px" }}>
                        {winner.name}
                      </td>
                      <td className="p-4 text-center text-sm font-semibold text-green-400" style={{ padding: "8px" }}>
                        {winner.prize}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-style::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-style::-webkit-scrollbar-track {
          background: #2d2d2d;
          border-radius: 4px;
        }
        .scrollbar-style::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
          backdrop-filter: none; /* Removed blur effect */
        }
        .scrollbar-style::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default LudoWinners;