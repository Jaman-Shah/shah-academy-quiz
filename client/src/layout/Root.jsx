import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="my-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
