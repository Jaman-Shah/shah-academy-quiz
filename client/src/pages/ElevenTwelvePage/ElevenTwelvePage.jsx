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
      className="space-y-8"
    >
      <div className="page-header">
        <span className="page-kicker">Eleven - Twelve</span>
        <h2 className="page-title">Push for sharper results with higher-level practice.</h2>
        <p className="page-subtitle">
          Step into tougher subject sets designed for confidence, recall, and exam
          readiness.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <PageNavigateBtn
          address="/eleven-twelve-physics"
          name="Physics"
          tag="Subject"
          subtitle="Advanced problem-solving and concept reinforcement."
        />
        <PageNavigateBtn
          address="/eleven-twelve-chemistry"
          name="Chemistry"
          tag="Subject"
          subtitle="Practice reactions, structure, and deeper chapter coverage."
        />
        <PageNavigateBtn
          address="/eleven-twelve-math"
          name="Math"
          tag="Subject"
          subtitle="Refine advanced techniques with cleaner, harder sets."
        />
      </div>
    </motion.div>
  );
};

export default ElevenTwelvePage;
