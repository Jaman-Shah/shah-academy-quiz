import { useState } from "react";

const QuizItem = ({ quizItem, answers, setAnswers }) => {
  const { number, question, options } = quizItem;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (index, option) => {
    setSelectedOption(index);
    const updatedAnswers = answers.map((answer) =>
      answer.number === number ? { ...answer, answered: option } : answer
    );
    if (!updatedAnswers.some((answer) => answer.number === number)) {
      updatedAnswers.push({ number, answered: option });
    }
    setAnswers(updatedAnswers);
  };

  return (
    <div className="surface-card-soft p-5">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Question {number}
        </p>
        <h2 className="mt-3 text-xl font-bold leading-8 text-slate-900">
          {question}
        </h2>
      </div>

      <div className="grid gap-3">
        {options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index, option)}
            className={`rounded-[1.25rem] border-2 px-4 py-4 text-left text-sm font-semibold transition ${
              selectedOption === index
                ? "border-indigo-500 bg-indigo-50 text-slate-900 shadow-[0_8px_18px_rgba(67,56,202,0.12)]"
                : "border-slate-200 bg-white text-slate-700"
            } ${selectedOption !== null ? "cursor-not-allowed" : "active:scale-[0.99]"}`}
            disabled={selectedOption !== null}
          >
            <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
              {index + 1}
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizItem;
