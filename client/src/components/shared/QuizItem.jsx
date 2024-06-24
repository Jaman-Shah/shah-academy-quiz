import React, { useState } from "react";

const QuizItem = ({ quizItem, answers, setAnswers }) => {
  const { number, question, options } = quizItem;
  const [selectedOption, setSelectedOption] = useState(null);

  // updating the answers state by clicking buttons
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
    <div className="p-3">
      <div className="font-normal text-2xl p-4 mb-2">
        {number}.{question}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options &&
          options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index, option)}
              className={`border px-2 py-4 ${
                selectedOption === index ? "bg-blue-400" : ""
              }`}
              disabled={selectedOption !== null}
            >
              {index + 1}.{option}
            </button>
          ))}
      </div>
    </div>
  );
};

export default QuizItem;
