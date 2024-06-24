import React from "react";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import QuizNameCard from "../../components/shared/QuizNameCard";

const ElevenTwelveChemistry = () => {
  const { quizzes } = useGetQuizzes("eleven_twelve", "chemistry");

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

export default ElevenTwelveChemistry;
