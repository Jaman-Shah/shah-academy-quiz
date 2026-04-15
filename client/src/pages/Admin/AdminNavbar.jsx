import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="surface-card-soft mb-6 flex flex-wrap justify-center gap-3 p-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
      <Link
        to={`/admin`}
        className="rounded-full bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800"
      >
        Add Quiz
      </Link>
      <Link
        to={`/admin/quizzes`}
        className="rounded-full border border-slate-200 bg-white px-4 py-3 transition hover:border-orange-200 hover:bg-orange-50"
      >
        Manage Quizzes
      </Link>
      <Link
        to={`/admin/users`}
        className="rounded-full border border-slate-200 bg-white px-4 py-3 transition hover:border-orange-200 hover:bg-orange-50"
      >
        Users
      </Link>
      <Link
        to={`/profile`}
        className="rounded-full border border-slate-200 bg-white px-4 py-3 transition hover:border-orange-200 hover:bg-orange-50"
      >
        Profile
      </Link>
    </nav>
  );
};

export default AdminNavbar;
