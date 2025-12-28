import { useState } from "react";

import { MdOutlineDashboard, MdOutlineEventNote } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaTicketAlt, FaMusic, FaDollarSign } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";

import logo from "../../../public/Images/logo.png";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className="bg-[#140f36] h-screen w-full shadow-2xl">
      <div className="flex flex-col items-center gap-4 py-5">
        <Link to="/" className="">
          <img src={logo} alt="" className="w-20 h-8 mx-auto" />
        </Link>
        <hr className="w-24 border border-[#E0E1E2]" />
      </div>
      <div className="flex flex-col px-4 py-3 gap-1">
        {[
          {
            to: "/overview",
            icon: <MdOutlineDashboard fontSize={18} />,
            label: "Overview",
          },
          {
            to: "/events",
            icon: <FaTicketAlt fontSize={18} />,
            label: "Events",
          },
          {
            to: "/artists",
            icon: <FaMusic fontSize={16} />,
            label: "Artists",
          },

          {
            to: "/orders",
            icon: <FaDollarSign fontSize={18} />,
            label: "Orders",
          },
          {
            to: "/users",
            icon: <FiUsers fontSize={18} />,
            label: "Users",
          },
          {
            to: "/transactions",
            icon: <FaArrowTrendUp fontSize={18} />,
            label: "Transactions",
          },
          {
            to: "/settings",
            icon: <IoSettingsOutline fontSize={18} />,
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
              `flex items-center font-medium gap-3 text-sm py-2 px-2 rounded-md 
              ${
                isActive
                  ? "bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] text-white shadow-lg shadow-[#6d1db9]/30"
                  : selected === to
                  ? "bg-[#bd85f1] text-black"
                  : "text-[#99a1af] hover:text-white hover:bg-white/5"
              }
              hover:bg-[#bd85f1] hover:text-[#fff]`
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
