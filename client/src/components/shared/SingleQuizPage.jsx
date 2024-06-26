import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleQuiz from "../../hooks/useGetSingleQuiz";
import QuizItem from "./QuizItem";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useGetAttendance from "../../hooks/useGetAttendance";
import AttendanceItem from "./AttendanceItem";

const SingleQuizPage = () => {
  const { id } = useParams();
  const { quiz } = useGetSingleQuiz(id);

  // Destructuring the properties of quiz
  const { _id, title, quizzes } = quiz || {}; // Adding a default empty object to avoid destructuring undefined

  // Getting and setting default answers initially to state
  const [answers, setAnswers] = useState([]);

  const email = "jamanshah5400@gmail.com";

  const axiosCommon = useAxiosCommon();

  // Initializing the answers state with default values
  useEffect(() => {
    if (quizzes) {
      const initialAnswers = quizzes.map((quiz) => ({
        question: quiz.question,
        number: quiz.number,
        result: false,
        answered: "not answered",
        correct: quiz.answer,
        options: quiz.options,
      }));
      setAnswers(initialAnswers);
    }
  }, [quizzes]);

  console.log("answers are", answers);

  // Checking the wrong and right answers and making final result
  const finalResult = answers.map((element) => {
    const correspondingQuiz = quizzes?.find(
      (quiz) => quiz.number === element.number
    );
    const result =
      correspondingQuiz &&
      element.answered.toLowerCase() === correspondingQuiz.answer.toLowerCase();
    return {
      ...element,
      result: result || false,
      correct: correspondingQuiz ? correspondingQuiz.answer : "not answered",
    };
  });

  console.log("final result is", finalResult);

  // Getting attendance of a user
  const { attendance, refetch, isLoading } = useGetAttendance(email, _id);

  console.log("attendance is object:", typeof attendance === "object");

  const handleSubmitAnswers = async () => {
    const quiz_attendance = {
      attended_by: email,
      quiz_id: _id,
      answers: finalResult,
    };
    try {
      const response = await axiosCommon.post(
        `/attendance?email=${email}&quiz_id=${_id}`,
        quiz_attendance
      );
      console.log(response.data);
      refetch(); // Refetching attendance from server
    } catch (error) {
      console.log(error.message);
    }
  };

  // counting correct answers
  let correctCount = 0;
  if (attendance && attendance.answers) {
    correctCount = attendance.answers.reduce(
      (count, answer) => count + (answer.result ? 1 : 0),
      0
    );
  }
  const totalQuestions = attendance?.answers?.length || quizzes?.length || 0;
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {attendance && (
          <div className="flex flex-col items-center justify-center ">
            <div>
              <h1 className="font-bold text-3xl mb-4">Your Score</h1>
            </div>
            <div className="h-32 w-32 bg-orange-500 rounded-full border-2 text-4xl text-white border-black flex justify-center items-center">
              {`${correctCount}/${totalQuestions}`}
            </div>
          </div>
        )}
        {attendance && attendance.answers && attendance.answers.length > 0
          ? attendance.answers.map((answer) => (
              <AttendanceItem key={answer.number} answer={answer} />
            ))
          : quizzes &&
            quizzes.map((quizItem) => (
              <QuizItem
                key={quizItem.number}
                quizItem={quizItem}
                answers={answers}
                setAnswers={setAnswers}
              />
            ))}
      </div>
      <div className="text-center">
        {!attendance && (
          <button
            onClick={handleSubmitAnswers}
            className="border p-2 bg-green-300 mt-4"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleQuizPage;
