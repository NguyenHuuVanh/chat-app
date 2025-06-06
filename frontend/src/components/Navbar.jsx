import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router-dom";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 items-center justify-end w-full">
          {/* LOGO – ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-poppin bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-widest">
                  Streamify
                </span>
              </Link>
            </div>
          )}

          {/* BELL ICON */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle hover:bg-white/20 hover:text-primary">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePicture} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle  hover:bg-white/20 hover:text-primary" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70 " />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
