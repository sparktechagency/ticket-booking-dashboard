import { useState } from "react";

import { MdOutlineDashboard } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdDiamond } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsChatHeart } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { BiDollarCircle } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { FaShieldHalved } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { Link, NavLink } from "react-router-dom";

import logo from "../../../public/Images/logo.png";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className="bg-[#ffffff] h-screen w-full shadow-2xl">
      <div className="flex flex-col items-center gap-4 py-5">
        <Link to="/" className="">
          <img src={logo} alt="" className="h-12 mx-auto" />
        </Link>
        <hr className="w-24 border border-[#E0E1E2]" />
      </div>
      <div className="flex flex-col px-4 py-3 gap-1">
        {[
          {
            to: "/overview",
            icon: <MdOutlineDashboard fontSize={24} />,
            label: "Overview",
          },
          {
            to: "/growth-retention",
            icon: <GoGraph fontSize={24} />,
            label: "Growth and Retention",
          },
          {
            to: "/revenue-management",
            icon: <BiDollarCircle fontSize={24} />,
            label: "Revenue Management",
          },

          {
            to: "/notifications",
            icon: <AiOutlineTransaction fontSize={24} />,
            label: "Notifications",
          },
          // {
          //   to: "/reliabilities",
          //   icon: <MdDiamond fontSize={24} />,
          //   label: "Reliabilities",
          // },
          {
            to: "/support",
            icon: <MdOutlineMarkEmailUnread fontSize={24} />,
            label: "Support",
          },
          {
            to: "/admin-controls",
            icon: <MdOutlineAdminPanelSettings fontSize={24} />,
            label: "Admin Controls",
          },
          {
            to: "/settings",
            icon: <IoSettingsOutline fontSize={24} />,
            label: "Settings",
          },

          // {
          //   to: "/edit-profile",
          //   icon: <FaRegUserCircle fontSize={24} />,
          //   label: "Edit Profile",
          // },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => handleSelect(to)}
            className={({ isActive }) =>
              `flex items-center font-medium gap-3 text-base py-2 px-2 rounded-md 
              ${
                isActive
                  ? "bg-gradient-to-r from-[#2B7FFF] to-[#00D3F2]  text-[#fff]"
                  : selected === to
                  ? "bg-[#2B7FFF] text-black"
                  : "text-black"
              }
              hover:bg-[#2B7FFF] hover:text-[#fff]`
            }
          >
            {icon}
            <p>{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
