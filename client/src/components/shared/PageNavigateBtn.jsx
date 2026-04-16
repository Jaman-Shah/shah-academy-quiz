import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineBeaker,
  HiOutlineCalculator,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const getCardStyle = (name, address) => {
  const key = `${name} ${address}`.toLowerCase();

  if (key.includes("physics")) {
    return {
      icon: HiOutlineLightningBolt,
      iconClass: "bg-indigo-100 text-indigo-700",
      accentClass: "from-indigo-500/10 to-transparent",
    };
  }

  if (key.includes("chemistry")) {
    return {
      icon: HiOutlineBeaker,
      iconClass: "bg-emerald-100 text-emerald-700",
      accentClass: "from-emerald-500/10 to-transparent",
    };
  }

  if (key.includes("math")) {
    return {
      icon: HiOutlineCalculator,
      iconClass: "bg-amber-100 text-amber-700",
      accentClass: "from-amber-400/10 to-transparent",
    };
  }

  return {
    icon: HiOutlineAcademicCap,
    iconClass: "bg-violet-100 text-violet-700",
    accentClass: "from-violet-500/10 to-transparent",
  };
};

const PageNavigateBtn = ({
  address,
  name,
  subtitle,
  tag,
  disabled = false,
  fallbackAddress = "/login",
}) => {
  const { icon: Icon, iconClass, accentClass } = getCardStyle(name, address);
  const cardClassName = `group surface-card-soft relative flex min-h-[9rem] w-full overflow-hidden border border-slate-100 p-4 transition duration-300 sm:min-h-[9.5rem] sm:p-5 ${
    disabled
      ? "opacity-70 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)]"
      : "hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)]"
  }`;
  const content = (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.85),rgba(255,255,255,0.98))]" />
      <div className={`absolute right-0 top-0 h-28 w-28 rounded-full bg-gradient-to-br ${accentClass} blur-2xl`} />

      <div className="relative flex w-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-[1.15rem] text-[1.5rem] sm:h-16 sm:w-16 sm:rounded-[1.35rem] sm:text-[1.7rem] ${iconClass}`}>
            <Icon />
          </div>
          <span className="info-chip">{tag || "Explore"}</span>
        </div>

        <div className="mt-5 min-w-0">
          <p className="text-2xl font-extrabold tracking-tight text-slate-900">
            {name}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <Link to={disabled ? fallbackAddress : address} className={cardClassName}>
      {content}
    </Link>
  );
};

export default PageNavigateBtn;
