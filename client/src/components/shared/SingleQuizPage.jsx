import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleQuiz from "../../hooks/useGetSingleQuiz";
import useGetAttendance from "../../hooks/useGetAttendance";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import QuizItem from "./QuizItem";
import AttendanceItem from "./AttendanceItem";
import Loading from "./Loading";

const SingleQuizPage = () => {
  const { id } = useParams();
  const { quiz, isLoading: quizLoading } = useGetSingleQuiz(id);
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [answers, setAnswers] = useState([]);

  const { _id, quizzes } = quiz || {};
  const { attendance, refetch, isLoading: attendanceLoading } =
    useGetAttendance(_id);

  useEffect(() => {
    if (!Array.isArray(quizzes)) {
      setAnswers([]);
      return;
    }

    const initialAnswers = quizzes.map((quizItem) => ({
      question: quizItem.question,
      number: quizItem.number,
      result: false,
      answered: "not answered",
      correct: quizItem.answer,
      options: quizItem.options,
    }));

    setAnswers(initialAnswers);
  }, [quizzes]);

  const finalResult = answers.map((element) => {
    const correspondingQuiz = quizzes?.find(
      (quizItem) => quizItem.number === element.number
    );
    const isCorrect =
      correspondingQuiz &&
      element.answered.toLowerCase() === correspondingQuiz.answer.toLowerCase();

    return {
      ...element,
      result: isCorrect || false,
      correct: correspondingQuiz ? correspondingQuiz.answer : "not answered",
    };
  });

  const handleSubmitAnswers = async () => {
    try {
      await axiosSecure.post(`/attendance?quiz_id=${_id}`, {
        answers: finalResult,
      });
      refetch();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  let correctCount = 0;
  if (attendance?.answers) {
    correctCount = attendance.answers.reduce(
      (count, answer) => count + (answer.result ? 1 : 0),
      0
    );
  }

  const totalQuestions = attendance?.answers?.length || quizzes?.length || 0;

  if (quizLoading || attendanceLoading) {
    return <Loading />;
  }

  if (dbUser?.status === "inactive") {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-red-300 bg-red-50 p-6 text-center">
        <h1 className="text-2xl font-bold text-red-700">Account Inactive</h1>
        <p className="mt-2 text-gray-700">
          Your account is inactive. Contact an admin before attending quizzes.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {attendance && (
          <div className="flex flex-col items-center justify-center">
            <div>
              <h1 className="mb-4 text-3xl font-bold">Your Score</h1>
            </div>
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-black bg-orange-500 text-4xl text-white">
              {`${correctCount}/${totalQuestions}`}
            </div>
          </div>
        )}

        {attendance?.answers?.length > 0
          ? attendance.answers.map((answer) => (
              <AttendanceItem key={answer.number} answer={answer} />
            ))
          : quizzes?.map((quizItem) => (
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
            className="mt-4 border bg-green-300 p-2"
            disabled={!answers.length}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleQuizPage;
