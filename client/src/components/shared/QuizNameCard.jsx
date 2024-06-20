import React from "react";
import { Link } from "react-router-dom";

const QuizNameCard = ({ quiz, index }) => {
  const { _id: id } = quiz;

  console.log(index);

  return (
    <div className="border bg-green-300">
      <Link to={`/quiz/${id}`} className="p-4">
        <h1 className="text-center font-bold text-3xl ">{index}</h1>
        <p className="text-center">{id}</p>
      </Link>
    </div>
  );
};

export default QuizNameCard;
