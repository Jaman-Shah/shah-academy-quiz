import React from "react";
import { Link } from "react-router-dom";

const PageNavigateBtn = ({ address, name }) => {
  return (
    <Link
      to={address}
      className="bg-green-300 flex w-full md:w-1/4 justify-center"
    >
      <p className=" px-4 py-2">{name}</p>
    </Link>
  );
};

export default PageNavigateBtn;
