import React from "react";
import PageNavigateBtn from "../../components/shared/PageNavigateBtn";
import { motion } from "framer-motion";

const ElevenTwelvePage = () => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col justify-center items-center gap-4"
    >
      <PageNavigateBtn address="/eleven-twelve-physics" name="Physics" />
      <PageNavigateBtn address="/eleven-twelve-chemistry" name="Chemistry" />
      <PageNavigateBtn address="/eleven-twelve-math" name="Math" />
    </motion.div>
  );
};

export default ElevenTwelvePage;
