import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineClipboardList,
  HiOutlineSparkles,
} from "react-icons/hi";
import useGetSingleQuiz from "../../hooks/useGetSingleQuiz";
import useGetAttendance from "../../hooks/useGetAttendance";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import QuizItem from "./QuizItem";
import AttendanceItem from "./AttendanceItem";
import Loading from "./Loading";
import CompanyDetails from "./CompanyDetails";
import {
  getErrorMessage,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/alerts";

const SingleQuizPage = () => {
  const { id } = useParams();
  const { quiz, isLoading: quizLoading } = useGetSingleQuiz(id);
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [answers, setAnswers] = useState([]);

  const {
    _id,
    quizzes,
    classIs,
    subject,
  } = quiz || {};
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
      await showSuccessAlert("Answers Submitted", "Your quiz was saved.");
      refetch();
    } catch (error) {
      await showErrorAlert("Submit Failed", getErrorMessage(error));
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
  const backPath =
    classIs === "Nine - Ten"
      ? "/nine-ten"
      : classIs === "Eleven - Twelve"
        ? "/eleven-twelve"
        : "/";

  if (quizLoading || attendanceLoading) {
    return <Loading />;
  }

  if (dbUser?.status === "inactive") {
    return (
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-center">
        <h1 className="text-2xl font-bold text-rose-700">Account Inactive</h1>
        <p className="mt-2 text-slate-600">
          Your account is inactive. Contact an admin before attending quizzes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--primary-light)_58%,var(--primary-dark))] px-5 py-6 text-white shadow-[0_18px_36px_rgba(67,56,202,0.22)] sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <CompanyDetails compact tone="dark" />
        </div>
      </section>

      <div className="surface-card overflow-hidden">
        <div className="border-b border-slate-100 bg-white px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              to={backPath}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition active:scale-95"
            >
              <HiOutlineArrowLeft className="text-xl" />
            </Link>
            <span className="w-11" />
            <span className="w-11" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-5 py-5 md:grid-cols-4">
          <div className="stat-card">
            <span className="stat-value">{totalQuestions}</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {attendance
                ? correctCount
                : answers.filter((answer) => answer.answered !== "not answered").length}
            </span>
            <span className="stat-label">
              {attendance ? "Correct" : "Answered"}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{subject || "Quiz"}</span>
            <span className="stat-label">Subject</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{attendance ? "Saved" : "Live"}</span>
            <span className="stat-label">Status</span>
          </div>
        </div>
      </div>

      {attendance && (
        <div className="surface-card px-5 py-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-3xl text-indigo-700">
            <HiOutlineSparkles />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
            Your Score
          </h2>
          <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-indigo-100 bg-[linear-gradient(135deg,var(--primary),var(--primary-light))] text-3xl font-extrabold text-white shadow-[0_14px_30px_rgba(67,56,202,0.2)]">
            {`${correctCount}/${totalQuestions}`}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
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

      {!attendance && (
        <div className="surface-card-soft p-4">
          <button
            onClick={handleSubmitAnswers}
            className="btn-primary flex w-full items-center justify-center gap-2"
            disabled={!answers.length}
          >
            <HiOutlineClipboardList className="text-lg" />
            Submit Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleQuizPage;
