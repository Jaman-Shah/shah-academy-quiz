import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="surface-card-soft flex items-center gap-3 px-6 py-5 text-base font-bold text-slate-700">
        <span className="h-3 w-3 animate-pulse rounded-full bg-indigo-500" />
        Loading...
      </div>
    </div>
  );
};

export default Loading;
