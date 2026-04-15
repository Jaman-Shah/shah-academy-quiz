import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/shared/Loading";
import EditQuizModal from "../../components/shared/EditQuizModal";

const ManageQuizzes = () => {
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data: quizzes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-manage-quizzes"],
    queryFn: async () => {
      const response = await axiosSecure("/quizzes");
      return response.data;
    },
  });

  const handleDelete = async (quizId) => {
    const confirmed = window.confirm(
      "Delete this quiz? This will also remove its attendance records."
    );

    if (!confirmed) {
      return;
    }

    try {
      await axiosSecure.delete(`/quizzes/${quizId}`);
      setMessage("Quiz deleted successfully.");
      refetch();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  const handleOpenEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setIsEditModalOpen(true);
    setMessage("");
  };

  const handleSaved = (nextMessage) => {
    setMessage(nextMessage);
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-5">
      <div className="page-header max-w-3xl">
        <span className="page-kicker">Admin Control</span>
        <h1 className="page-title">Manage quizzes with edit and delete actions.</h1>
        <p className="page-subtitle">
          Review every quiz, update its details and questions, or remove it entirely
          when needed.
        </p>
      </div>

      {message && (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-3 font-semibold">
          {message}
        </p>
      )}

      <div className="grid gap-5">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="surface-card-soft p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="info-chip">{quiz.classIs}</span>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {quiz.subject}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Chapter {quiz.chapter}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-slate-900">
                  {quiz.chapter_name || quiz.title || "Untitled Quiz"}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {quiz.paper} paper | {quiz.quizzes?.length || 0} questions
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(quiz)}
                  className="btn-secondary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(quiz._id)}
                  className="rounded-2xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <EditQuizModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        quizData={selectedQuiz}
        onSaved={handleSaved}
      />
    </div>
  );
};

export default ManageQuizzes;
