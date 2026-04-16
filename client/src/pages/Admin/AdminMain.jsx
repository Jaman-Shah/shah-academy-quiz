import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AppShell from "../../components/shared/AppShell";
import CompanyDetails from "../../components/shared/CompanyDetails";

const AdminMain = () => {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--primary-light)_58%,var(--primary-dark))] px-5 py-6 text-white shadow-[0_18px_36px_rgba(67,56,202,0.22)] sm:px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="page-header max-w-2xl">
              <span className="inline-flex rounded-full bg-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                Admin Panel
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Management Workspace
              </h1>
            </div>

            <CompanyDetails compact tone="dark" />
          </div>
        </section>

        <AdminNavbar />
        <Outlet />
      </div>
    </AppShell>
  );
};

export default AdminMain;
