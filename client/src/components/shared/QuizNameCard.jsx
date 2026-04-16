import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineClipboardList } from "react-icons/hi";

const QuizNameCard = ({ quiz, index }) => {
  const {
    _id: id,
    title,
    chapter_name: chapterName,
    classIs,
    subject,
    paper,
    chapter,
    quizzes,
  } = quiz;
  const displayTitle = title || chapterName || "Untitled Quiz";
  const questionCount = Array.isArray(quizzes) ? quizzes.length : 0;

  return (
    <div className="surface-card-soft overflow-hidden border border-slate-100">
      <Link to={`/quiz/${id}`} className="block p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] bg-indigo-50 text-[1.35rem] text-indigo-700 sm:h-14 sm:w-14 sm:rounded-[1.25rem] sm:text-[1.45rem]">
              <HiOutlineClipboardList />
            </div>
            <div className="min-w-0">
              <span className="info-chip">Quiz {index}</span>
              <h1 className="mt-3 break-words text-[15px] font-extrabold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
                {displayTitle}
              </h1>
            </div>
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 sm:h-11 sm:w-11">
            <HiOutlineArrowRight className="text-xl" />
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[11px] sm:tracking-[0.16em]">
          <span className="rounded-full bg-indigo-50 px-3 py-2 text-indigo-700">
            {classIs}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-emerald-700">
            {subject}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-700">
            {paper} paper
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">
            Chapter {chapter}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-end rounded-[1.25rem] bg-slate-50 px-4 py-3">
          <span className="shrink-0 text-sm font-bold text-indigo-700">
            {questionCount || "?"} Q
          </span>
        </div>
      </Link>
    </div>
  );
};

export default QuizNameCard;
