import React from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import QuizNameCard from "../../components/shared/QuizNameCard";

const ElevenTwelvePhysics = () => {
  const { quizzes } = useGetQuizzes("Eleven - Twelve", "physics");

  return (
    <div className="space-y-8">
      <div className="page-header">
        <span className="page-kicker">Eleven - Twelve Physics</span>
        <h1 className="page-title">Take on deeper physics problem sets.</h1>
        <p className="page-subtitle">
          Work through chapter-based quizzes designed for stronger analysis and exam
          readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {quizzes &&
          quizzes.map((quiz, index) => {
            return (
              <QuizNameCard
                key={quiz._id}
                quiz={quiz}
                index={quizzes.length - index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ElevenTwelvePhysics;
