import { Link, NavLink } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiOutlineUserAdd,
  HiOutlineX,
} from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import { getPrimaryNavigation } from "./navigation";
import { getErrorMessage, showErrorAlert, showSuccessAlert } from "../../utils/alerts";

const AppSidebar = ({ isOpen, onClose }) => {
  const { user, dbUser, logoutUser } = useAuth();
  const logoSrc = "/logo/logo.png";
  const menuItems = getPrimaryNavigation(user, dbUser).map((item) => {
    if (item.to === "/") return { ...item, icon: HiOutlineHome };
    if (item.to === "/profile") return { ...item, icon: HiOutlineUser };
    if (item.to === "/login") return { ...item, icon: HiOutlineLogin };
    if (item.to === "/register") return { ...item, icon: HiOutlineUserAdd };
    if (item.to === "/admin") return { ...item, icon: HiOutlineShieldCheck };
    return { ...item, icon: HiOutlineAcademicCap };
  });

  const handleLogout = async () => {
    try {
      await logoutUser();
      onClose();
      await showSuccessAlert("Logged Out", "You have signed out.");
    } catch (error) {
      await showErrorAlert("Logout Failed", getErrorMessage(error));
    }
  };

  const displayName = dbUser?.name || user?.displayName || user?.email || "Guest Mode";
  const statusText = dbUser?.status || (user ? "active" : "login to save progress");

  return (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
        className={`absolute inset-0 z-40 bg-slate-950/45 transition duration-300 md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        className={`absolute left-0 top-0 z-50 flex h-full w-[272px] flex-col bg-[var(--card-bg)] shadow-[12px_0_34px_rgba(15,23,42,0.14)] transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-100 px-5 pb-5 pt-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                Menu
              </p>
              <Link
                to="/"
                onClick={onClose}
                className="mt-2 block"
                aria-label="Shah Academy home"
              >
                <img
                  src={logoSrc}
                  alt="Shah Academy"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition duration-200 active:scale-95"
              aria-label="Close menu"
            >
              <HiOutlineX className="text-2xl" />
            </button>
          </div>

          <div className="mt-5 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(67,56,202,0.12),rgba(99,102,241,0.08))] px-4 py-4">
            <p className="text-sm font-bold text-slate-900">{displayName}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {statusText}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-5">
          {menuItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-100 text-[var(--primary)]"
                    : "text-slate-700 hover:bg-slate-50"
                }`
              }
            >
              <Icon className="text-xl" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {user && (
          <div className="border-t border-slate-100 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-3 font-semibold text-white transition hover:bg-rose-400"
            >
              <HiOutlineLogout className="text-lg" />
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default AppSidebar;
