import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // converting pathname to title

  const dynamicTitle = pathname
    .substring(1)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="p-4 border border-red-200">
      <h1 className="text-4xl text-center font-bold">QUIZ APP</h1>
      <p className="text-center">{dynamicTitle}</p>
    </div>
  );
};

export default Navbar;
