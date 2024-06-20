import React from "react";
import { Link } from "react-router-dom";

const QuizNameCard = ({ quiz, index }) => {
  const { _id: id, title, classIs, subject, paper, chapter } = quiz;

  console.log(index);

  return (
    <div className="border bg-green-300">
      <Link to={`/quiz/${id}`} className="p-4">
        <h1 className="text-center font-bold text-3xl ">Quiz : {index}</h1>
        <div className="text-center uppercase font-bold">
          <p>{classIs}</p>
          <p>{subject}</p>
          <p>
            {paper} paper , Chapter:{chapter}
          </p>
          <p className="text-2xl">{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default QuizNameCard;
