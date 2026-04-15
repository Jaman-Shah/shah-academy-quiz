import React from "react";
import PageNavigateBtn from "../../components/shared/PageNavigateBtn";
import { motion } from "framer-motion";

const NineTenPage = () => {
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
      className="space-y-8"
    >
      <div className="page-header">
        <span className="page-kicker">Nine - Ten</span>
        <h2 className="page-title">Build strong fundamentals, one subject at a time.</h2>
        <p className="page-subtitle">
          Choose a subject to unlock focused chapter-based quizzes and keep your
          school preparation consistent.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <PageNavigateBtn
          address="/nine-ten-physics"
          name="Physics"
          tag="Subject"
          subtitle="Core concepts, formulas, and problem-solving practice."
        />
        <PageNavigateBtn
          address="/nine-ten-chemistry"
          name="Chemistry"
          tag="Subject"
          subtitle="Chapter-wise MCQs for reactions, theory, and precision."
        />
        <PageNavigateBtn
          address="/nine-ten-math"
          name="Math"
          tag="Subject"
          subtitle="Sharpen logic, speed, and accuracy with guided practice."
        />
      </div>
    </motion.div>
  );
};

export default NineTenPage;
