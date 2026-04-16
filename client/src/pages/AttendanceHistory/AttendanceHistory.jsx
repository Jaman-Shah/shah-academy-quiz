import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import Loading from "../../components/shared/Loading";
import useGetAttendanceHistory from "../../hooks/useGetAttendanceHistory";

const AttendanceHistory = () => {
  const { attendanceHistory, isLoading } = useGetAttendanceHistory();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-5">
      <div className="page-header">
        <span className="page-kicker">Attendance History</span>
        <h1 className="page-title">Attended Exams</h1>
      </div>

      {attendanceHistory.length ? (
        <div className="grid gap-4">
          {attendanceHistory.map((item) => (
            <div key={item._id} className="surface-card-soft p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="info-chip">
                      {item.quiz?.classIs || "Class"}
                    </span>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                      {item.quiz?.subject || "Subject"}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {item.quiz?.title || "Attended Exam"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Score: {item.correctCount}/{item.totalQuestions} • Submitted{" "}
                    {item.submittedAt
                      ? new Date(item.submittedAt).toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>

                {item.quiz_id && (
                  <Link
                    to={`/quiz/${item.quiz_id}`}
                    className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                  >
                    View Result
                    <HiOutlineArrowRight className="text-lg" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="surface-card px-5 py-6">
          <h2 className="text-xl font-extrabold text-slate-900">No Exams Yet</h2>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;
