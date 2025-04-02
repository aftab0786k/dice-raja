import React, { useState } from "react";

const getTokensData = () => [
  { id: 1, name: "Bitcoin", buyPrice: "₹45,00,000", sellPrice: "₹44,80,000" },
  { id: 2, name: "Ethereum", buyPrice: "₹3,10,000", sellPrice: "₹3,05,000" },
  { id: 3, name: "Solana", buyPrice: "₹12,500", sellPrice: "₹12,300" },
  { id: 4, name: "Ripple", buyPrice: "₹45", sellPrice: "₹44" },
  { id: 5, name: "Cardano", buyPrice: "₹120", sellPrice: "₹115" },
  { id: 6, name: "Dogecoin", buyPrice: "₹7.50", sellPrice: "₹7.40" },
  { id: 7, name: "Polygon", buyPrice: "₹80", sellPrice: "₹78" },
  { id: 8, name: "Chainlink", buyPrice: "₹1,200", sellPrice: "₹1,180" },
  { id: 9, name: "Avalanche", buyPrice: "₹2,500", sellPrice: "₹2,450" },
  { id: 10, name: "Litecoin", buyPrice: "₹8,000", sellPrice: "₹7,900" },
];

const BuySellTokens = () => {
  const [tokens] = useState(getTokensData());
  const [loading] = useState(false);
  const [error] = useState(null);

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-600 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-6">
          <h2 className="text-2xl font-extrabold text-center text-white tracking-wide drop-shadow-lg" style={{padding: "10px"}}>
            📈 Buy & Sell Tokens
          </h2>
        </div>
        {loading && <p className="text-center text-gray-200 py-6">Loading...</p>}
        {error && <p className="text-center text-red-500 py-6">{error}</p>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <div className="max-h-80 overflow-y-auto scrollbar-style">
              <table className="min-w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <thead>
                  <tr className="text-sm bg-gradient-to-r from-purple-800 to-indigo-800 text-white">
                    <th className="p-4 text-left" style={{padding: "8px"}}>Token</th>
                    <th className="p-4 text-center" style={{padding: "8px"}}>Buy Price</th>
                    <th className="p-4 text-center" style={{padding: "8px"}}>Sell Price</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token) => (
                    <tr
                      key={token.id}
                      className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
                    >
                      <td className="p-4 text-left text-sm font-semibold text-gray-300" style={{padding: "10px"}}>
                        {token.name}
                      </td>
                      <td className="p-4 text-center text-sm font-semibold text-green-400" style={{padding: "10px"}}>
                        {token.buyPrice}
                      </td>
                      <td className="p-4 text-center text-sm font-semibold text-red-400" style={{padding: "10px"}}>
                        {token.sellPrice}
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
        }
        .scrollbar-style::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default BuySellTokens;