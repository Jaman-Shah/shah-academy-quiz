import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, dbUser, logoutUser } = useAuth();

  const dynamicTitle = pathname
    .substring(1)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,#16353d_0%,#225564_34%,#c65d3b_100%)] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.24)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(243,182,76,0.3),transparent_28%)]" />

      <div className="relative flex min-h-[15rem] flex-col justify-between gap-8 md:min-h-[16rem]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <motion.div
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80">
              Smart Practice Platform
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              <Link to="/">Shah Academy Quiz Hub</Link>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 md:text-base">
              Practice by class, move subject by subject, and keep your learning flow
              sharp with a cleaner, faster quiz experience.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white">
            <Link
              to="/"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  Profile
                </Link>
                {dbUser?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
                  >
                    Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-white px-4 py-2 text-slate-900 transition hover:bg-orange-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.div
            className="relative max-w-md rounded-[1.75rem] border border-white/20 bg-white/12 px-5 py-4 backdrop-blur"
            initial={{ y: 0, x: 0 }}
            animate={{
              y: dynamicTitle ? "8%" : "0%",
              x: dynamicTitle ? "4%" : "0%",
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              Current Section
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              {dynamicTitle || "Welcome"}
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 self-start rounded-[1.75rem] border border-white/20 bg-white/12 px-4 py-3 backdrop-blur md:self-auto"
            initial={{ x: "-50%" }}
            animate={{ x: dynamicTitle ? "-10%" : "0%" }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="h-16 w-16 rounded-full border-[4px] border-white bg-cover bg-center shadow-xl md:h-20 md:w-20"
              style={{
                backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/146/146031.png")`,
              }}
            ></div>
            {user && (
              <div className="text-white">
                <p className="text-sm font-bold">
                  {dbUser?.name || user.displayName || user.email}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/75">
                  {dbUser?.role || "user"} | {dbUser?.status || "active"}
                </p>
              </div>
            )}
            {!user && (
              <div className="text-white">
                <p className="text-sm font-bold">Guest Mode</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/75">
                  Login to save quiz progress
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
