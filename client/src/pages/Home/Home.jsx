import React from "react";
import { motion } from "framer-motion";
import PageNavigateBtn from "../../components/shared/PageNavigateBtn";

const containerVariants = {
  initial: {
    x: 1000,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 40,
      stiffness: 1000,
      duration: 0.5,
    },
  },
};

const Home = () => {
  return (
    <motion.div
      className="flex flex-col gap-6 items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <PageNavigateBtn address="/nine-ten" name="Nine - Ten" />
      <PageNavigateBtn address="/eleven-twelve" name="Eleven - Twelve" />
    </motion.div>
  );
};

export default Home;
