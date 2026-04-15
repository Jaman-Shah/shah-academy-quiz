import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Root = () => {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-3 pb-10 pt-3 md:px-6">
      <Navbar />
      <div className="surface-card mt-12 p-5 md:mt-16 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
