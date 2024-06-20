import React from "react";
import { useParams } from "react-router-dom";
import useGetSingleQuiz from "../../hooks/useGetSingleQuiz";
import QuizItem from "./QuizItem";

const SingleQuizPage = () => {
  const { id } = useParams();
  const { quiz } = useGetSingleQuiz(id);
  const { title, quizzes } = quiz;
  return (
    <div>
      <div>
        <h1>Start Answering {title}</h1>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {quizzes &&
          quizzes.map((quizItem) => {
            console.log("quiz number", quizItem.number);
            return <QuizItem key={quizItem.number} quizItem={quizItem} />;
          })}
      </div>
    </div>
  );
};

export default SingleQuizPage;
