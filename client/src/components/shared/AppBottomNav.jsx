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
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white px-2 pb-1.5 pt-1.5 shadow-[0_-10px_20px_rgba(15,23,42,0.05)] md:px-5">
      <div className={`grid gap-1.5 ${user ? "grid-cols-4" : "grid-cols-3"}`}>
        {items.map(({ to, label, icon: Icon, active }) => (
          <Link
            key={`${to}-${label}`}
            to={to}
            className={`rounded-[0.875rem] px-1 py-0.5 text-center text-[9px] font-semibold transition ${
              active ? "text-[var(--primary)]" : "text-slate-400"
            }`}
          >
            <span
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[1.45rem] transition ${
                active ? "bg-indigo-50 text-[var(--primary)]" : "bg-transparent"
              }`}
            >
              <Icon />
            </span>
            <span className="mt-px block leading-tight">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppBottomNav;
