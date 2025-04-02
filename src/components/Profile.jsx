import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Footer from "./Footer";

const ProfileCard = () => {
  const [activeSection, setActiveSection] = useState(window.innerWidth > 768 ? "wallet" : null);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setActiveSection("wallet"); // Open the first section by default in desktop view
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (screenWidth <= 768 && !event.target.closest(".nav-btn") && !event.target.closest(".content-section")) {
        setActiveSection(null); // Close the active section on outside click only in mobile view
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [screenWidth]);

  const handleButtonClick = (sectionId) => {
    if (screenWidth > 768) {
      setActiveSection(sectionId); // Keep the container open in desktop view
    } else {
      setActiveSection(activeSection === sectionId ? null : sectionId); // Toggle in mobile view
    }
  };

  const sections = [
    { id: "wallet", label: "💰 Wallet" },
    { id: "calculator", label: "🧮 Token Calculator" },
    { id: "history", label: "📜 History" },
    { id: "password", label: "🔑 Password Change" },
    { id: "terms", label: "📑 Terms" },
    { id: "logout", label: "🚪 Logout" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setBalance(response.data.balance || 0);
        setTokens(response.data.tokens || 0);
      } catch (err) {
        console.error("Failed to fetch profile:", err.response?.data?.error || err.message);
      }
    };
    fetchProfile();
  }, []);

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
    if (amount) setTokens(parseInt(amount) / 10);
  };

  const handleChangePassword = () => {
    const newPassword = prompt("Enter new password:");
    if (newPassword) setPassword(newPassword);
  };

  const buttonStyle = {
    width: "100%",
    height: "50px",
    fontSize: "16px",
    textAlign: "center",
    display: "block",
    margin: "10px auto",
  };

  const renderContent = (sectionId) => {
    switch (sectionId) {
      case "wallet":
        return (
          <>
            <h2 className="text-[#e94560] text-4px font-bold mb-1">Wallet Balance</h2>
            <div className="wallet-balance" style={{ width: "100%", maxWidth: "300px", padding: "15px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>₹ {balance.toLocaleString()}</div>
            <div className="action-buttons">
              <button onClick={addFunds} className="nav-btn" style={buttonStyle}>Add Funds +</button>
              <button onClick={withdrawFunds} className="nav-btn" style={buttonStyle}>Withdraw -</button>
            </div>
          </>
        );
      case "calculator":
        return (
          <>
            <h2 className="text-[#e94560] text-4px font-bold mb-2">Token Calculator</h2>
            <p>1 Token = ₹10</p>
            <div className="wallet-balance">{tokens} Tokens</div>
            <button onClick={calculateTokens} className="nav-btn" style={buttonStyle}>Convert ₹ to Tokens</button>
          </>
        );
      case "history":
        return (
          <>
            <h2 className="text-[#e94560] text-4px font-bold mb-3">Transaction History</h2>
            <ul className="history-list">
              <li>Added ₹1000 - 2 days ago</li>
              <li>Withdrawn ₹500 - 5 days ago</li>
              <li>Converted ₹2000 to Tokens - 1 week ago</li>
            </ul>
          </>
        );
      case "password":
        return (
          <>
            <h2 className="text-[#e94560] text-4px font-bold mb-3">Password Change</h2>
            <p className="mb-2">Current Password: {password || "******"}</p>
            <button onClick={handleChangePassword} className="nav-btn" style={buttonStyle}>Change Password</button>
          </>
        );
      case "terms":
        return (
          <>
            <h2 className="text-[#e94560] text-4px font-bold mb-2">Terms & Conditions</h2>
            <p className="text-sm text-gray-300">
              1. All transactions are final. <br />
              2. Tokens cannot be refunded once used. <br />
              3. By using this platform, you agree to our terms.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-wrapper">
          <div className="sidebar">
            <div className="profile-info">
              <img src="icon.webp" alt="Profile" className="profile-pic" />
              <h3 style={{ color: "#fff", marginBottom: "5px" }}>{profile.name || "Player Name"}</h3>
              <p style={{ color: "#e94560" }}>User ID: {profile._id || "0001"}</p>
            </div>

            <div className="nav-menu">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    className={`nav-btn ${activeSection === section.id ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent outside click handler from triggering
                      handleButtonClick(section.id);
                    }}
                    style={buttonStyle}
                  >
                    {section.label}
                  </button>
                  {activeSection === section.id && screenWidth <= 768 && (
                    <div className="content-section active mobile-view">
                      <div className="wallet-card" style={{ width: "100%", maxWidth: "350px", padding: "15px" }}>
                        {renderContent(section.id)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="main-content">
            {screenWidth > 768 && (
              <div className="content-section active">
                <div className="wallet-card">{renderContent(activeSection)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileCard;
