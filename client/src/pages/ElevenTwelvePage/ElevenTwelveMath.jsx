import React from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";

const ElevenTwelveMath = () => {
  const { quizzes } = useGetQuizzes("Eleven - Twelve", "math");

  return (
    <div className="grid grid-cols-1 gap-4">
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
  );
};

export default ElevenTwelveMath;
