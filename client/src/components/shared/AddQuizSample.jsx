import React from "react";

const AddQuizSample = ({ quiz, deleteSingleQuiz, editSingleQuiz }) => {
  const { number, question, options, answer } = quiz;

  return (
    <div className="surface-card-soft relative mt-4 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="info-chip">Question {number}</span>
          <h1 className="mt-3 text-lg font-bold text-slate-900">
            {number}. {question}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => editSingleQuiz(quiz)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-600 transition hover:border-orange-200 hover:bg-orange-50"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => deleteSingleQuiz(quiz)}
            className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-red-600 transition hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {options &&
          options.map((option, index) => {
            const isAnswer = option === answer;

            return (
              <div
                key={index}
                className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                  isAnswer
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <span className="mr-2 font-bold">{index + 1}.</span>
                {option}
              </div>
            );
          })}
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-600">
        Correct answer: <span className="text-emerald-700">{answer}</span>
      </p>
    </div>
  );
};

export default AddQuizSample;
