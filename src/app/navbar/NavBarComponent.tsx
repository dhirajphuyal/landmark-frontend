"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Image from "next/image";

import { AppBar, Box, IconButton, Menu, Avatar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { navLinks } from "../../../raw-data/nav-links";
import { Logout } from "@mui/icons-material";

interface UserInfo {
  firstname: string;
  lastname: string;
  exp: number;
}

const NavBarComponent = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  //   useEffect(() => {
  //     const userToken = localStorage.getItem("token");
  //     if (userToken) {
  //       try {
  //         const user = jwt.decode(userToken) as UserInfo;
  //         if (user) {
  //           user && setUserInfo(user);
  //         }
  //       } catch (error) {
  //         console.error("Error decoding JWT:", error);
  //       }
  //     }
  //   }, []);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleRouteChange = (link: string) => {
    router.push(link);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 2px 1px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex py-[0.5rem] md:px-[15em]">
          {/* Mobile view */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <Image
              src="/images/trading_school_logo.png"
              alt="nasalogo"
              height="140"
              width="180"
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              //   color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <div className="flex flex-col p-[10px] gap-[20px]">
                {navLinks.map((nav, index) => (
                  <button
                    key={index}
                    // size="small"
                    onClick={() => handleRouteChange(nav.path)}
                    className={`border-b hover:border-green-500 hover:border-b-1 text-[16px] text-black ${
                      nav.path === currentPath && "font-bold"
                    }`}
                  >
                    {nav.name}
                  </button>
                ))}
              </div>
            </Menu>
          </Box>

          {/* Desktop view */}
          <Box
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => router.push("/")}
          >
            <Image
              src="/images/trading_school_logo.png"
              alt="nasalogo"
              height="70"
              width="150"
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: "2em",
              alignItems: "center",
            }}
          >
            {navLinks.map((nav, index) => (
              <button
                key={index}
                // size="small"
                onClick={() => handleRouteChange(nav.path)}
                className={`hover:border-b hover:border-naasa-green hover:border-b-1 text-[14px] text-black ${
                  nav.path === currentPath && "font-bold"
                }`}
              >
                {nav.name}
              </button>
            ))}

            {userInfo ? (
              <div className="flex items-center gap-[10px]">
                <Avatar>{userInfo?.firstname?.charAt(0).toUpperCase()}</Avatar>
                <span className="font-bold">
                  {userInfo.firstname} {userInfo.lastname}
                </span>
                <Tooltip title="Logout">
                  <IconButton color="secondary" onClick={handleLogout}>
                    <Logout />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <button
                onClick={() => handleRouteChange("/login")}
                className="rounded-[26px] py-[10px] px-[20px] border border-naasa-yellow"
              >
                Sign In
              </button>
            )}
          </Box>
        </div>
      </AppBar>
    </>
  );
};

export default NavBarComponent;
