import React from "react";
import PageNavigateBtn from "../../components/shared/PageNavigateBtn";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <PageNavigateBtn address="/nine-ten" name="Nine - Ten" />
      <PageNavigateBtn address="/eleven-twelve" name="Eleven - Twelve" />
    </div>
  );
};

export default Home;
