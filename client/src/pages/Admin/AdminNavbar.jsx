import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="p-4 border bg-gray-300 flex justify-center gap-4 font-bold uppercase">
      <Link to={`/admin`}>Add Quiz</Link>
      <Link>Others</Link>
    </nav>
  );
};

export default AdminNavbar;
