import React from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import { getPrimaryNavigation } from "./navigation";
import CompanyDetails from "./CompanyDetails";
import { getErrorMessage, showErrorAlert, showSuccessAlert } from "../../utils/alerts";

const getSectionContent = (pathname) => {
  if (pathname === "/") {
    return {
      kicker: "Home",
      eyebrow: "Daily Quiz Practice",
      title: "Build momentum with focused learning.",
    };
  }

  if (pathname === "/nine-ten") {
    return {
      kicker: "School Level",
      eyebrow: "Class Track",
      title: "Nine - Ten",
    };
  }

  if (pathname === "/eleven-twelve") {
    return {
      kicker: "College Level",
      eyebrow: "Class Track",
      title: "Eleven - Twelve",
    };
  }

  if (pathname.startsWith("/quiz/")) {
    return {
      kicker: "Quiz Session",
      eyebrow: "Live Practice",
      title: "Answer, review, and continue.",
    };
  }

  if (pathname.startsWith("/admin")) {
    return {
      kicker: "Admin Panel",
      eyebrow: "Management Workspace",
      title: "Control quizzes and users.",
    };
  }

  if (pathname === "/profile") {
    return {
      kicker: "Profile",
      eyebrow: "Account Center",
      title: "Keep your details updated.",
    };
  }

  if (pathname === "/login") {
    return {
      kicker: "Account",
      eyebrow: "Welcome Back",
      title: "Sign in and continue learning.",
    };
  }

  if (pathname === "/register") {
    return {
      kicker: "Account",
      eyebrow: "New Learner",
      title: "Create your account.",
    };
  }

  const fallbackTitle = pathname
    .replace(/^\//, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    kicker: "Section",
    eyebrow: "Current View",
    title: fallbackTitle || "Shah Academy",
  };
};

const Navbar = ({ onMenuOpen }) => {
  const { pathname } = useLocation();
  const { user, dbUser, logoutUser } = useAuth();
  const navItems = getPrimaryNavigation(user, dbUser);
  const section = getSectionContent(pathname);
  const isHomePage = pathname === "/";
  const useInlineScrollableHeader =
    pathname === "/nine-ten" ||
    pathname === "/eleven-twelve" ||
    pathname.startsWith("/nine-ten-") ||
    pathname.startsWith("/eleven-twelve-") ||
    pathname === "/profile" ||
    pathname.startsWith("/quiz/") ||
    pathname.startsWith("/admin");
  const logoSrc = "/logo/logo.png";

  const handleLogout = async () => {
    try {
      await logoutUser();
      await showSuccessAlert("Logged Out", "You have signed out.");
    } catch (error) {
      await showErrorAlert("Logout Failed", getErrorMessage(error));
    }
  };

  return (
    <motion.header
      className="relative bg-white px-4 py-3 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:px-5 md:px-6 lg:px-8"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition duration-200 hover:bg-slate-100 active:scale-95 md:hidden"
              aria-label="Open menu"
            >
              <HiOutlineMenuAlt2 className="text-[1.45rem]" />
            </button>

            <Link
              to="/"
              className="hidden h-12 w-[200px] shrink-0 overflow-hidden transition hover:opacity-90 md:block lg:h-14 lg:w-[240px]"
              aria-label="Shah Academy home"
            >
              <img
                src={logoSrc}
                alt="Shah Academy"
                className="h-full w-full object-cover object-center"
              />
            </Link>
          </div>

          <div className="ml-auto text-right md:hidden">
            <Link
              to="/"
              className="block h-11 w-[170px] overflow-hidden transition hover:opacity-90"
              aria-label="Shah Academy home"
            >
              <img
                src={logoSrc}
                alt="Shah Academy"
                className="h-full w-full object-cover object-center"
              />
            </Link>
          </div>

          <nav className="hidden md:flex md:flex-wrap md:items-center md:justify-end md:gap-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-[var(--primary)]"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
              >
                Logout
              </button>
            )}
          </nav>
        </div>

        {!isHomePage && !useInlineScrollableHeader && (
          <div
            className="mt-5 grid gap-4 border-t border-slate-200 pt-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end"
          >
            <div>
              <p className="text-sm font-semibold text-slate-500">{section.eyebrow}</p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {section.title}
              </h1>
            </div>

            <CompanyDetails compact tone="light" />
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
