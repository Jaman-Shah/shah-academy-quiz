import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="surface-card-soft mb-6 flex flex-wrap justify-center gap-3 p-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          `rounded-full px-4 py-3 transition ${
            isActive
              ? "bg-[linear-gradient(135deg,var(--primary),var(--primary-light))] text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
          }`
        }
      >
        Add Quiz
      </NavLink>
      <NavLink
        to="/admin/quizzes"
        className={({ isActive }) =>
          `rounded-full px-4 py-3 transition ${
            isActive
              ? "bg-[linear-gradient(135deg,var(--primary),var(--primary-light))] text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
          }`
        }
      >
        Manage Quizzes
      </NavLink>
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          `rounded-full px-4 py-3 transition ${
            isActive
              ? "bg-[linear-gradient(135deg,var(--primary),var(--primary-light))] text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
          }`
        }
      >
        Users
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `rounded-full px-4 py-3 transition ${
            isActive
              ? "bg-[linear-gradient(135deg,var(--primary),var(--primary-light))] text-white"
              : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
          }`
        }
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default AdminNavbar;
