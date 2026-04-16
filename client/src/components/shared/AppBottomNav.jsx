import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineCollection,
  HiOutlineHome,
  HiOutlinePencilAlt,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from "react-icons/hi";
import useAuth from "../../hooks/useAuth";

const AppBottomNav = () => {
  const { pathname } = useLocation();
  const { user, dbUser } = useAuth();

  const items = user
    ? [
        {
          to: "/",
          label: "Home",
          icon: HiOutlineHome,
          active: pathname === "/",
        },
        {
          to: "/nine-ten",
          label: "School",
          icon: HiOutlineAcademicCap,
          active: pathname === "/nine-ten" || pathname.startsWith("/nine-ten-"),
        },
        {
          to: "/eleven-twelve",
          label: "College",
          icon: HiOutlineCollection,
          active:
            pathname === "/eleven-twelve" || pathname.startsWith("/eleven-twelve-"),
        },
        {
          to: pathname.startsWith("/quiz/")
            ? pathname
            : dbUser?.role === "admin"
              ? "/admin"
              : "/profile",
          label: pathname.startsWith("/quiz/")
            ? "Quiz"
            : dbUser?.role === "admin"
              ? "Admin"
              : "Profile",
          icon: pathname.startsWith("/quiz/")
            ? HiOutlinePencilAlt
            : dbUser?.role === "admin"
              ? HiOutlineShieldCheck
              : HiOutlineUser,
          active:
            pathname.startsWith("/quiz/") ||
            pathname === "/profile" ||
            pathname.startsWith("/admin"),
        },
      ]
    : [
        {
          to: "/",
          label: "Home",
          icon: HiOutlineHome,
          active: pathname === "/",
        },
        {
          to: "/login",
          label: "Login",
          icon: HiOutlineUser,
          active: pathname === "/login",
        },
        {
          to: "/register",
          label: "Register",
          icon: HiOutlinePencilAlt,
          active: pathname === "/register",
        },
      ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white px-3 pb-4 pt-3 shadow-[0_-12px_24px_rgba(15,23,42,0.05)] md:px-5">
      <div className={`grid gap-2 ${user ? "grid-cols-4" : "grid-cols-3"}`}>
        {items.map(({ to, label, icon: Icon, active }) => (
          <Link
            key={`${to}-${label}`}
            to={to}
            className={`rounded-[1.25rem] px-2 py-2 text-center text-[11px] font-semibold transition ${
              active ? "text-[var(--primary)]" : "text-slate-400"
            }`}
          >
            <span
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-xl transition ${
                active ? "bg-indigo-50 text-[var(--primary)]" : "bg-transparent"
              }`}
            >
              <Icon />
            </span>
            <span className="mt-1 block">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppBottomNav;
