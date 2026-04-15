import React from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import QuizNameCard from "../../components/shared/QuizNameCard";

const NineTenPhysics = () => {
  const { quizzes } = useGetQuizzes("Nine - Ten", "physics");

  return (
    <div className="space-y-8">
      <div className="page-header">
        <span className="page-kicker">Nine - Ten Physics</span>
        <h1 className="page-title">Pick a chapter and start solving.</h1>
        <p className="page-subtitle">
          Each quiz is arranged for faster concept checks and cleaner revision.
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

export default NineTenPhysics;
