import React from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import QuizNameCard from "../../components/shared/QuizNameCard";

const NineTenChemistry = () => {
  const { quizzes } = useGetQuizzes("Nine - Ten", "chemistry");

  return (
    <div className="space-y-8">
      <div className="page-header">
        <span className="page-kicker">Nine - Ten Chemistry</span>
        <h1 className="page-title">Open a set and test your reaction speed.</h1>
        <p className="page-subtitle">
          Browse chapter-wise quizzes for theory recall, formulas, and MCQ accuracy.
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

export default NineTenChemistry;
