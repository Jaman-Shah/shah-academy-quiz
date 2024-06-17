import React from "react";
import { Link } from "react-router-dom";

const PageNavigateBtn = ({ address, name }) => {
  return (
    <div>
      <Link
        to={address}
        className="px-4 py-2 border w-24 text-center hover:bg-gray-300"
      >
        {name}
      </Link>
    </div>
  );
};

export default PageNavigateBtn;
