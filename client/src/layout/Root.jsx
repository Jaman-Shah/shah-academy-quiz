import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Root = () => {
  return (
    <div className="px-2">
      <Navbar />
      <div className="mt-14 md:mt-20 p-4 rounded-3xl rounded-b">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
