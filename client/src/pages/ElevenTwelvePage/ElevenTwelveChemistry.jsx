import React from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import QuizNameCard from "../../components/shared/QuizNameCard";

const ElevenTwelveChemistry = () => {
  const { quizzes } = useGetQuizzes("Eleven - Twelve", "chemistry");

  return (
    <div className="space-y-8">
      <div className="page-header">
        <span className="page-kicker">Eleven - Twelve Chemistry</span>
        <h1 className="page-title">Move through advanced chemistry practice.</h1>
        <p className="page-subtitle">
          Review each chapter with cleaner quiz cards and a sharper study rhythm.
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

export default ElevenTwelveChemistry;
