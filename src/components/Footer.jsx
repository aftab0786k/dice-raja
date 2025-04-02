import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";

const Footer = () => {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();


  return (
    <div className="mt-5 flex flex-col justify-end pb-4 z-50" style={{marginTop: "4rem"}}>
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-[#0a1128] via-[#1c2541] to-[#0b3c5d] border-t-2 border-cyan-500 bg-opacity-70 shadow-2xl rounded-t-3xl w-full max-full flex justify-around p-2" style={{padding: screen.width <= 768 ? "7px" : "10px"}}>
        <NavItem
          icon={<HomeIcon style={{ fontSize: screen.width <= 768 ? "20px" : "30px" }} className="cursor-pointer" onClick={() => navigate("/")} />} 
          label="Home"
          active={active === "home"}
          onClick={() => setActive("home")}
        />

        <NavItem
          icon={<LocalGroceryStoreIcon style={{ fontSize: screen.width <= 768 ? "20px" : "29px" }} className="cursor-pointer" />}
          label="Supermarket"
          active={active === "Supermarket"}
          onClick={() => setActive("Supermarket")}
        />

        <NavItem
          icon={<SportsEsportsIcon style={{ fontSize: screen.width <= 768 ? "20px" : "30px" }} className="cursor-pointer" onClick={() => navigate("/playzone")} />}
          label="Playzone"
          active={active === "playzone"}
          onClick={() => setActive("playzone")}
        />

        <NavItem
          icon={<GroupIcon style={{ fontSize: screen.width <= 768 ? "20px" : "30px" }} className="cursor-pointer" />}
          label="Friends"
          active={active === "Friends"}
          onClick={() => setActive("Friends")}
        />
        {/* onClick={() => navigate("/friend")} */}

        <NavItem
          icon={<AccountCircleIcon style={{ fontSize: screen.width <= 768 ? "20px" : "27px" }} className="cursor-pointer" onClick={() => navigate("/profile")} />}
          label="Profile"
          active={active === "profile"}
          onClick={() => setActive("profile")}
        />
      </nav>
    </div>
  );
};

export default Footer;

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center text-white transition-all ${active ? "text-blue-400" : "text-gray-400"} hover:scale-110 active:scale-95`}>
      {icon}
      <span className="text-xs pt-1 md:text-sm lg:text-md cursor-pointer">{label}</span>
    </button>
  );
}
