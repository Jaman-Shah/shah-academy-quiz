import React from "react";
import { Link } from "react-router-dom";

const QuizNameCard = ({ quiz, index }) => {
  const {
    _id: id,
    title,
    chapter_name: chapterName,
    classIs,
    subject,
    paper,
    chapter,
  } = quiz;
  const displayTitle = title || chapterName || "Untitled Quiz";

  return (
    <div className="surface-card-soft overflow-hidden">
      <Link to={`/quiz/${id}`} className="block p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="info-chip">Quiz {index}</span>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {displayTitle}
            </h1>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Ready
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span className="rounded-full bg-orange-50 px-3 py-2 text-orange-700">
            {classIs}
          </span>
          <span className="rounded-full bg-teal-50 px-3 py-2 text-teal-700">
            {subject}
          </span>
          <span className="rounded-full bg-sky-50 px-3 py-2 text-sky-700">
            {paper} paper
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-600">
            Chapter {chapter}
          </span>
        </div>

        <p className="mt-6 text-sm leading-7 text-slate-600">
          Open this set to begin practice, track your answers, and review your final
          score at the end.
        </p>
      </Link>
    </div>
  );
};

export default QuizNameCard;
