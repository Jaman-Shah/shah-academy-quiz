import React from "react";
import { Link } from "react-router-dom";

const PageNavigateBtn = ({ address, name }) => {
  return (
    <Link
      to={address}
      className="bg-[#ffeaa7] shadow-xl flex h-24 w-full rounded-full md:w-1/4 justify-center items-center"
    >
      <p className=" px-4 py-2 font-bold text-3xl">{name}</p>
    </Link>
  );
};

export default PageNavigateBtn;
