import React from "react";
import PageNavigateBtn from "../../components/shared/PageNavigateBtn";

const NineTenPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <PageNavigateBtn address="/nine-ten-physics" name="Physics" />
      <PageNavigateBtn address="/nine-ten-chemistry" name="Chemistry" />
      <PageNavigateBtn address="/nine-ten-math" name="Math" />
    </div>
  );
};

export default NineTenPage;
