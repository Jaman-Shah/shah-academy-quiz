import React from "react";
import { Link } from "react-router-dom";

const PageNavigateBtn = ({ address, name, subtitle, tag }) => {
  return (
    <Link
      to={address}
      className="group surface-card-soft relative flex min-h-[12rem] w-full overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(15,23,42,0.16)] md:min-h-[14rem]"
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-orange-200/50 blur-2xl transition duration-300 group-hover:bg-orange-300/60" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl" />

      <div className="relative flex w-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <span className="info-chip">{tag || "Explore"}</span>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 transition duration-300 group-hover:text-orange-500">
            Open
          </span>
        </div>

        <div className="mt-8">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">
            {name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600">
            {subtitle || "Start a focused round of subject-based practice."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PageNavigateBtn;
