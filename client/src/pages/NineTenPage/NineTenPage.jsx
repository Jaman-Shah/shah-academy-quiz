import PageNavigateBtn from "../../components/shared/PageNavigateBtn";
import { motion } from "framer-motion";
import CompanyDetails from "../../components/shared/CompanyDetails";

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
      className="space-y-6"
    >
      <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--primary-light)_58%,var(--primary-dark))] px-5 py-6 text-white shadow-[0_18px_36px_rgba(67,56,202,0.22)] sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="page-header max-w-2xl">
            <span className="inline-flex rounded-full bg-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              School Level
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Nine - Ten
            </h1>
          </div>

          <CompanyDetails compact tone="dark" />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <PageNavigateBtn
          address="/nine-ten-physics"
          name="Physics"
          tag="Subject"
        />
        <PageNavigateBtn
          address="/nine-ten-chemistry"
          name="Chemistry"
          tag="Subject"
        />
        <PageNavigateBtn
          address="/nine-ten-math"
          name="Math"
          tag="Subject"
        />
      </div>
    </motion.div>
  );
};

export default NineTenPage;
