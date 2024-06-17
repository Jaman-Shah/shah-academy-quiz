import React from "react";
import PageNavigateBtn from "../../components/shared/PageNavigateBtn";

const ElevenTwelvePage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <PageNavigateBtn address="/eleven-twelve-physics" name="Physics" />
      <PageNavigateBtn address="/eleven-twelve-chemistry" name="Chemistry" />
      <PageNavigateBtn address="/eleven-twelve-math" name="Math" />
    </div>
  );
};

export default ElevenTwelvePage;
