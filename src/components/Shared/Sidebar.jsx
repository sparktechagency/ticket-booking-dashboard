import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTicketAlt, FaMusic, FaDollarSign, FaUser, FaUsers } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdContentPaste } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../public/Images/logo.png";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  const handleSelect = (path) => {
    setSelected(path);
  };

  const isSettingsActive =
    location.pathname === "/settings/profile" ||
    location.pathname === "/settings/content";

  return (
    <div className="bg-[#140f36] h-screen w-full shadow-2xl">
      <div className="flex flex-col items-center gap-4 py-5">
        <Link to="/" className="">
          <img src={logo} alt="" className="w-32 h-8 object-contain mx-auto" />
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
            to: "/teams",
            icon: <FaUsers fontSize={18} />,
            label: "Teams",
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
              hover:bg-[#bd85f1] hover:text-[#fff] transition-all`
            }
          >
            {icon}
            <p>{label}</p>
          </NavLink>
        ))}

        {/* Settings with Submenu */}
        <div>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`w-full flex items-center justify-between font-medium gap-3 text-sm py-2 px-2 rounded-md transition-all
              ${
                isSettingsActive
                  ? "bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] text-white shadow-lg shadow-[#6d1db9]/30"
                  : "text-[#99a1af] hover:text-white hover:bg-white/5"
              }
              hover:bg-[#bd85f1] hover:text-[#fff]`}
          >
            <div className="flex items-center gap-3">
              <IoSettingsOutline fontSize={18} />
              <p>Settings</p>
            </div>
            {settingsOpen ? (
              <FiChevronUp fontSize={16} />
            ) : (
              <FiChevronDown fontSize={16} />
            )}
          </button>

          {/* Submenu */}
          {settingsOpen && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink
                to="/settings/profile"
                onClick={() => handleSelect("/settings/profile")}
                className={({ isActive }) =>
                  `flex items-center font-medium gap-3 text-sm py-2 px-2 rounded-md transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] text-white shadow-lg shadow-[#6d1db9]/30"
                      : "text-[#99a1af] hover:text-white hover:bg-white/5"
                  }
                  hover:bg-[#bd85f1] hover:text-[#fff]`
                }
              >
                <FaUser fontSize={14} />
                <p>Profile</p>
              </NavLink>

              <NavLink
                to="/settings/content-management"
                onClick={() => handleSelect("/settings/content-management")}
                className={({ isActive }) =>
                  `flex items-center font-medium gap-3 text-sm py-2 px-2 rounded-md transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#6d1db9] to-[#bd85f1] text-white shadow-lg shadow-[#6d1db9]/30"
                      : "text-[#99a1af] hover:text-white hover:bg-white/5"
                  }
                  hover:bg-[#bd85f1] hover:text-[#fff]`
                }
              >
                <MdContentPaste fontSize={14} />
                <p>Content Management</p>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
