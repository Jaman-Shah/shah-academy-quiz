import React from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi";

const companyInfo = [
  {
    label: "Founder / Teacher",
    value: "Shahazada Shah",
    icon: HiOutlineUser,
  },
  {
    label: "Mobile",
    value: "010000000000",
    icon: HiOutlinePhone,
  },
  {
    label: "Address",
    value: "Block - D, Road - 05, Banasree Rampura,",
    icon: HiOutlineLocationMarker,
  },
];

const CompanyDetails = ({
  compact = false,
  className = "",
  tone = "dark",
}) => {
  const isLight = tone === "light";
  const titleTextClass = isLight ? "text-slate-900" : "text-white";
  const mutedTextClass = isLight ? "text-slate-500" : "text-white/72";
  const iconSurfaceClass = isLight
    ? "bg-indigo-50 text-[var(--primary)]"
    : "bg-white/15 text-white";

  return (
    <div
      className={`rounded-[1.75rem] border-2 border-dashed ${
        isLight
          ? "border-slate-200 bg-slate-50"
          : "border-white/35 bg-white/10 backdrop-blur-sm"
      } ${
        compact ? "p-4" : "p-5"
      } ${className}`}
    >
      <div
        className={`flex ${
          compact
            ? "items-start gap-3"
            : "items-start gap-4 sm:gap-5"
        }`}
      >
        <div
          className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] border-2 border-dashed ${
            isLight ? "border-slate-200 bg-white" : "border-white/30 bg-white/10"
          } ${compact ? "h-[82px] w-[82px]" : "h-[96px] w-[84px] sm:h-[120px] sm:w-[128px]"}`}
        >
          <div className="text-center">
            <HiOutlineOfficeBuilding
              className={`${compact ? "text-2xl" : "text-[1.65rem]"} ${titleTextClass} mx-auto`}
            />
            <p
              className={`mt-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] ${mutedTextClass}`}
            >
              Add Image
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2">
            
          </div>

          <div
            className={`grid gap-3 ${
              compact ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2"
            }`}
          >
            {companyInfo.map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <div className="flex items-start gap-2.5">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconSurfaceClass}`}
                  >
                    <Icon className="text-base" />
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${mutedTextClass}`}
                    >
                      {label}
                    </p>
                    <p
                      className={`mt-0.5 text-[13px] font-bold leading-5 ${titleTextClass}`}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
