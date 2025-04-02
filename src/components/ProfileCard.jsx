// import { useState } from 'react';
// import './ProfileCard.css';

// const ProfileCard = () => {
//   const [activeSection, setActiveSection] = useState('wallet');
//   const [balance, setBalance] = useState(15000);

//   const sections = [
//     { id: 'wallet', label: '💰 Wallet' },
//     { id: 'calculator', label: '🧮 Token Calculator' },
//     { id: 'history', label: '📜 History' },
//     { id: 'password', label: '🔑 Password Change' },
//     { id: 'terms', label: '📑 Terms' },
//     { id: 'logout', label: '🚪 Logout' }
//   ];

//   const addFunds = () => {
//     const amount = prompt('Enter amount to add:');
//     if (amount) setBalance(prev => prev + parseInt(amount));
//   };

//   const withdrawFunds = () => {
//     const amount = prompt('Enter amount to withdraw:');
//     if (amount) setBalance(prev => prev - parseInt(amount));
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-wrapper">
//         {/* Sidebar */}
//         <div className="sidebar">
//           <div className="profile-info">
//             <img 
//               src="icon.webp" 
//               alt="Profile" 
//               className="profile-pic"
//             />
//             <h3 style={{ color: '#fff', marginBottom: '5px' }}>Player Name</h3>
//             <p style={{ color: '#e94560' }}>User ID:0001</p>
//           </div>

//           <div className="nav-menu">
//             {sections.map((section) => (
//               <button
//                 key={section.id}
//                 className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
//                 onClick={() => setActiveSection(section.id)}
//               >
//                 {section.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="main-content">
//           {/* Wallet Section */}
//           <div className={`content-section ${activeSection === 'wallet' ? 'active' : ''}`}>
//             <div className="wallet-card">
//               <h2>Wallet Balance</h2>
//               <div className="wallet-balance">₹ {balance.toLocaleString()}</div>
//               <div className="action-buttons">
//                 <button onClick={addFunds} className="nav-btn">
//                   Add Funds +
//                 </button>
//                 <button onClick={withdrawFunds} className="nav-btn">
//                   Withdraw -
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Add other sections similarly */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;





import { useState } from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [activeSection, setActiveSection] = useState("wallet");
  const [balance, setBalance] = useState(15000);
  const [tokens, setTokens] = useState(100); // Token Calculator Section
  const [password, setPassword] = useState(""); // Password Change Section

  const sections = [
    { id: "wallet", label: "💰 Wallet" },
    { id: "calculator", label: "🧮 Token Calculator" },
    { id: "history", label: "📜 History" },
    { id: "password", label: "🔑 Password Change" },
    { id: "terms", label: "📑 Terms" },
    { id: "logout", label: "🚪 Logout" },
  ];

  const addFunds = () => {
    const amount = prompt("Enter amount to add:");
    if (amount) setBalance((prev) => prev + parseInt(amount));
  };

  const withdrawFunds = () => {
    const amount = prompt("Enter amount to withdraw:");
    if (amount) setBalance((prev) => prev - parseInt(amount));
  };

  const calculateTokens = () => {
    const amount = prompt("Enter amount in ₹ to convert to tokens:");
    if (amount) setTokens(parseInt(amount) / 10); // Assuming 1 token = ₹10
  };

  const handleChangePassword = () => {
    const newPassword = prompt("Enter new password:");
    if (newPassword) setPassword(newPassword);
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-info">
            <img src="icon.webp" alt="Profile" className="profile-pic" />
            <h3 style={{ color: "#fff", marginBottom: "5px" }}>Player Name</h3>
            <p style={{ color: "#e94560" }}>User ID:0001</p>
          </div>

          <div className="nav-menu">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-btn ${activeSection === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Wallet Section */}
          {activeSection === "wallet" && (
            <div className="content-section active">
              <div className="wallet-card">
                <h2 className="text-[#e94560] text-4px font-bold mb-1">Wallet Balance</h2>
                <div className="wallet-balance">₹ {balance.toLocaleString()}</div>
                <div className="action-buttons">
                  <button onClick={addFunds} className="nav-btn">
                    Add Funds +
                  </button>
                  <button onClick={withdrawFunds} className="nav-btn">
                    Withdraw -
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Token Calculator Section */}
          {activeSection === "calculator" && (
            <div className="content-section active">
              <div className="wallet-card">
                <h2 className="text-[#e94560] text-4px font-bold mb-2">Token Calculator</h2>
                <p>1 Token = ₹10</p>
                <div className="wallet-balance">{tokens} Tokens</div>
                <button onClick={calculateTokens} className="nav-btn">
                  Convert ₹ to Tokens
                </button>
              </div>
            </div>
          )}

          {/* History Section */}
          {activeSection === "history" && (
            <div className="content-section active">
              <div className="wallet-card">
                <h2 className="text-[#e94560] text-4px font-bold mb-3">Transaction History</h2>
                <ul className="history-list">
                  <li>Added ₹1000 - 2 days ago</li>
                  <li>Withdrawn ₹500 - 5 days ago</li>
                  <li>Converted ₹2000 to Tokens - 1 week ago</li>
                </ul>
              </div>
            </div>
          )}

          {/* Password Change Section */}
          {activeSection === "password" && (
            <div className="content-section active">
              <div className="wallet-card">
                <h2 className="text-[#e94560] text-4px font-bold mb-3">Password Change</h2>
                {/* <p>Current Password: {password || "******"}</p> */}
                <p className="mb-2">Current Password: {password || "******"}</p>

                <button onClick={handleChangePassword} className="nav-btn">
                  Change Password
                </button>
                
              </div>
            </div>
          )}

          {/* Terms Section */}
          {activeSection === "terms" && (
            <div className="content-section active">
              <div className="wallet-card">
                {/* <h2>Terms & Conditions</h2> */}
                <h2 className="text-[#e94560] text-4px font-bold mb-2"> Terms & Conditions</h2>
                <p className="text-sm text-gray-300">
                  1. All transactions are final. <br />
                  2. Tokens cannot be refunded once used. <br />
                  3. By using this platform, you agree to our terms.
                </p>
              </div>
            </div>
          )}

          {/* Logout Section */}
          {/* {activeSection === "logout" && (
            <div className="content-section active">
              <div className="wallet-card">
                <h2>Logout</h2>
                <p>Are you sure you want to log out?</p>
                <button className="nav-btn">Confirm Logout</button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
