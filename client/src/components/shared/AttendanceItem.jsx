import React from "react";

const AttendanceItem = ({ answer }) => {
  const { number, question, answered, correct, options } = answer;

  return (
    <div>
      <div className="bg-green-400 p-4 mb-2">
        {number}. {question}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options &&
          options.map((option, index) => {
            let bgColor = "";
            if (answered === option && answered === correct) {
              bgColor = "bg-green-400"; // when correct answer selected
            } else if (answered === option && answered !== correct) {
              bgColor = "bg-red-400"; // when wrong answer selected
            } else if (answered !== option && option === correct) {
              bgColor = "bg-yellow-400"; // highlighting correct answer when the wrong answer is selected
            }

            return (
              <div key={index} className={`border px-2 py-4 ${bgColor}`}>
                {index + 1}. {option}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AttendanceItem;
