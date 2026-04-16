const AttendanceItem = ({ answer }) => {
  const { number, question, answered, correct, options } = answer;
  const isCorrect = answered === correct;

  return (
    <div className="surface-card-soft p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Question {number}
          </p>
          <h2 className="mt-3 text-xl font-bold leading-8 text-slate-900">
            {question}
          </h2>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
            isCorrect
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {isCorrect ? "Correct" : "Review"}
        </span>
      </div>

      <div className="grid gap-3">
        {options?.map((option, index) => {
          let optionClass = "border-slate-200 bg-white text-slate-700";

          if (answered === option && answered === correct) {
            optionClass = "border-emerald-500 bg-emerald-50 text-emerald-800";
          } else if (answered === option && answered !== correct) {
            optionClass = "border-rose-500 bg-rose-50 text-rose-800";
          } else if (answered !== option && option === correct) {
            optionClass = "border-amber-400 bg-amber-50 text-amber-800";
          }

          return (
            <div
              key={index}
              className={`rounded-[1.25rem] border-2 px-4 py-4 text-sm font-semibold ${optionClass}`}
            >
              <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-xs font-bold text-slate-500">
                {index + 1}
              </span>
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceItem;
