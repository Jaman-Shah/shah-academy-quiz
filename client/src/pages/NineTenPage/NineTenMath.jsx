import React from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import QuizNameCard from "../../components/shared/QuizNameCard";

const NineTenMath = () => {
  const { quizzes } = useGetQuizzes("Nine - Ten", "math");

  return (
    <div className="space-y-8">
      <div className="page-header">
        <span className="page-kicker">Nine - Ten Math</span>
        <h1 className="page-title">Sharpen speed, logic, and confidence.</h1>
        <p className="page-subtitle">
          Choose a chapter-based quiz and work through math problems with a cleaner
          practice flow.
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

export default NineTenMath;
