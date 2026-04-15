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
      className="space-y-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="page-header">
        <span className="page-kicker">Shah Academy</span>
        <h2 className="page-title">Choose your class and train with purpose.</h2>
        <p className="page-subtitle">
          Move into the right level, browse subjects, and keep your quiz practice
          clean, fast, and motivating from the first click.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PageNavigateBtn
          address="/nine-ten"
          name="Nine - Ten"
          tag="School Level"
          subtitle="Physics, chemistry, and math sets designed for class nine and ten learners."
        />
        <PageNavigateBtn
          address="/eleven-twelve"
          name="Eleven - Twelve"
          tag="College Level"
          subtitle="Go deeper with higher-level practice built for class eleven and twelve preparation."
        />
      </div>
    </motion.div>
  );
};

export default Home;
