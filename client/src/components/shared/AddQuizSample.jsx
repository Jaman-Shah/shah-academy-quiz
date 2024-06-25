import React from "react";

const AddQuizSample = ({ quiz }) => {
  const { number, question, options, answer } = quiz;
  return (
    <div className="border-b-2 border-black mb-2 relative">
      <h1 className="font-bold ">
        {number} . {question}
      </h1>
      <div className="grid grid-cols-2">
        {options &&
          options.map((option, index) => {
            return (
              <div>
                <h1>
                  <span>{index + 1}</span>.{option}
                </h1>
              </div>
            );
          })}
      </div>
      <div>
        <h1>Answer is :{answer}</h1>
      </div>
      <button className="absolute border-2 border-black top-1/2 rounded-full p-1 right-0">
        Delete
      </button>
    </div>
  );
};

export default AddQuizSample;
