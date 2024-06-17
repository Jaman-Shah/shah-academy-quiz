import React from "react";
import PageNavigateBtn from "../../components/shared/PageNavigateBtn";

const Home = () => {
  return (
    <div className="flex flex-col gap-6  items-center justify-center">
      <PageNavigateBtn address="/nine-ten" name="Nine - Ten" />
      <PageNavigateBtn address="/eleven-twelve" name="Eleven - Twelve" />
    </div>
  );
};

export default Home;
