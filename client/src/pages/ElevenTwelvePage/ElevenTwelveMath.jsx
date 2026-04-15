import React from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import QuizNameCard from "../../components/shared/QuizNameCard";

const ElevenTwelveMath = () => {
  const { quizzes } = useGetQuizzes("Eleven - Twelve", "math");

  return (
    <div className="space-y-8">
      <div className="page-header">
        <span className="page-kicker">Eleven - Twelve Math</span>
        <h1 className="page-title">Practice the harder sets with more focus.</h1>
        <p className="page-subtitle">
          Step into advanced chapter-wise quizzes built for control, speed, and
          precision.
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

export default ElevenTwelveMath;
