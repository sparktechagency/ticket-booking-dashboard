import React, { useState } from "react";
import { PiBellSimpleRingingBold } from "react-icons/pi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import profileImg from "../../../public/Images/profile.png";

export default function Header() {
  const [dropdownMenu, setDropdownMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = (event) => {
    setDropdownMenu(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/sign-in");
    handleClose();
  };

  const routeTitles = {
    "/overview": "Overview",
    "/events": "Events",
    "/artists": "Artists",
    "/orders": "Orders",
    "/users": "Users",
    "/transactions": "Transactions",
    "/content-management": "Content Management",
    "/settings": "Settings",
  };

  const route = routeTitles[location.pathname] || "Dashboard";

  return (
    <div className="flex items-center justify-between w-full px-10 py-4  bg-[#040b1f] shadow-lg">
      <div>
        <h1 className="text-2xl text-white font-medium">
          {/* {navigationItems.find((item) => item.id === activeTab)?.label} */}
          {route}
        </h1>
        <p className="text-sm text-[#99a1af] font-sans">
          Manage your premium ticket marketplace
        </p>
      </div>{" "}
      <div className="flex items-center gap-4">
        {/* <div className="text-white">
          <Link to="/notifications">
            <PiBellSimpleRingingBold fontSize={24} />
          </Link>
        </div> */}
        <Button
          sx={{
            minWidth: 0, // important to avoid default MUI width
            width: 35,
            height: 35,
            padding: 0,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6d1db9, #bd85f1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              background: "linear-gradient(135deg, #bd85f1, #6d1db9)",
            },
          }}
          onClick={handleProfileClick}
        >
          <img
            src={profileImg}
            alt="Profile"
            className="h-6 w-6 rounded-full border border-white"
          />
        </Button>

        <Menu
          anchorEl={dropdownMenu}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              width: "130px",
            },
          }}
        >
          {/* <MenuItem component={Link} to="/edit-profile" onClick={handleClose}>
            Profile
          </MenuItem>
          <hr className="border-t border-[#ebebeb]" /> */}

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
