import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageNavigateBtn from "../../components/shared/PageNavigateBtn";
import CompanyDetails from "../../components/shared/CompanyDetails";
import UserAvatar from "../../components/shared/UserAvatar";
import {
  HiOutlineArrowRight,
  HiOutlineClipboardList,
} from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useGetAttendanceHistory from "../../hooks/useGetAttendanceHistory";

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
  const { user, dbUser } = useAuth();
  const axiosCommon = useAxiosCommon();
  const { attendanceHistory, isLoading: historyLoading } = useGetAttendanceHistory();

  const displayName = user
    ? dbUser?.name || user?.displayName || user?.email?.split("@")[0] || "Learner"
    : "Log in First";
  const profilePhoto = dbUser?.photoURL || user?.photoURL || "";

  const classPagePath =
    dbUser?.className === "Nine - Ten"
      ? "/nine-ten"
      : dbUser?.className === "Eleven - Twelve"
        ? "/eleven-twelve"
        : "/profile";

  const { data: classExams = [], isLoading: classExamsLoading } = useQuery({
    queryKey: ["home-class-exams", dbUser?.className],
    enabled: Boolean(user && dbUser?.className),
    queryFn: async () => {
      const response = await axiosCommon(
        `/quizzes?classIs=${encodeURIComponent(dbUser.className)}`
      );
      return Array.isArray(response.data) ? response.data : [];
    },
  });

  const attendedExamCount = attendanceHistory.length;
  const totalExamCount = classExams.length;
  const isStatsLoading = historyLoading || classExamsLoading;
  const summaryCardBaseClass =
    "rounded-[1.4rem] p-4 shadow-[0_10px_22px_rgba(15,23,42,0.06)]";
  const summaryCardContent = (
    label,
    value,
    icon,
    cardClassName,
    iconClassName
  ) => (
    <div className={`flex items-start justify-between gap-4 ${cardClassName}`}>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
          {label}
        </p>
        <p className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-[1.7rem]">{value}</p>
      </div>
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${iconClassName}`}>
        {icon}
      </span>
    </div>
  );

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <section className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--primary-light)_58%,var(--primary-dark))] px-5 py-6 text-white shadow-[0_18px_36px_rgba(67,56,202,0.22)] sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.18),transparent_34%)]" />

        <div className="relative space-y-5">
          <div className="flex items-center gap-4">
            <UserAvatar
              name={displayName}
              photoURL={profilePhoto}
              sizeClassName="h-20 w-20"
              textClassName="text-2xl"
              ringClassName="border-4 border-white/30"
              backgroundClassName="bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.08))]"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
                Welcome Back
              </p>
              <h2 className="mt-2 truncate text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {displayName}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link
                to={user ? "/attendance-history" : "/login"}
                className={`${summaryCardBaseClass} border border-orange-200 bg-orange-50/90 transition hover:-translate-y-0.5 ${user ? "" : "opacity-70"}`}
              >
                {summaryCardContent(
                  "Exam Attended",
                  user ? (isStatsLoading ? "--" : attendedExamCount) : "--",
                  <HiOutlineClipboardList className="text-xl text-orange-500" />,
                  "",
                  "bg-white text-orange-500"
                )}
              </Link>

              <Link
                to={user ? classPagePath : "/login"}
                className={`${summaryCardBaseClass} border border-slate-200 bg-white transition hover:-translate-y-0.5 ${user ? "" : "opacity-70"}`}
              >
                {summaryCardContent(
                  "Total Exams Of You",
                  user ? (isStatsLoading ? "--" : totalExamCount) : "--",
                  <HiOutlineArrowRight className="text-xl text-orange-500" />,
                  "",
                  "bg-orange-50 text-orange-500"
                )}
              </Link>
            </div>

            <CompanyDetails />
          </div>
        </div>
      </section>

      {!user && (
        <section className="space-y-4">
          <div className="px-1">
            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
              Login or Register for getting access
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex min-w-[132px] items-center justify-center rounded-[1.1rem] border-[3px] border-dotted border-orange-400 bg-orange-50 px-4 py-2.5 shadow-[0_10px_22px_rgba(251,146,60,0.12)] transition hover:-translate-y-0.5"
            >
              <h2 className="text-sm font-extrabold tracking-[0.12em] text-orange-700 sm:text-base">
                LOGIN
              </h2>
            </Link>

            <Link
              to="/register"
              className="inline-flex min-w-[132px] items-center justify-center rounded-[1.1rem] border-[3px] border-dotted border-slate-400 bg-white px-4 py-2.5 shadow-[0_10px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5"
            >
              <h2 className="text-sm font-extrabold tracking-[0.12em] text-slate-900 sm:text-base">
                REGISTER
              </h2>
            </Link>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="px-1">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Available Exams
          </h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <PageNavigateBtn
            address="/nine-ten"
            name="Nine - Ten"
            tag="School Level"
            disabled={!user}
            fallbackAddress="/login"
          />
          <PageNavigateBtn
            address="/eleven-twelve"
            name="Eleven - Twelve"
            tag="College Level"
            disabled={!user}
            fallbackAddress="/login"
          />
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
