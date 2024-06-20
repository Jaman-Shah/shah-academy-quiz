import React, { useState } from "react";

const QuizItem = ({ quizItem }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { number, question, options } = quizItem;

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <div>
      <div className="bg-green-400 p-4 mb-2">
        {number}.{question}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options &&
          options.map((option, index) => {
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`border px-2 py-4 ${
                  selectedOption === index ? "bg-blue-400" : ""
                }`}
              >
                {index + 1}.{option}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default QuizItem;
