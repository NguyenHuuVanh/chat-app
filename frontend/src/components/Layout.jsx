import React from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        {showSidebar && <SideBar />}

        <div className="flex flex-1 flex-col items-center justify-center">
          <Navbar />
          <main className="flex-1 overflow-y-auto w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
