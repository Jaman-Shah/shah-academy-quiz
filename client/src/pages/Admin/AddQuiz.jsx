import React, { useState } from "react";
import AddQuestionModal from "../../components/shared/AddQuestionModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddQuiz = () => {
  const axiosSecure = useAxiosSecure();
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (quizzes.length < 3) {
      return alert("Insert at least 3 questions");
    }

    const form = event.target;
    const classIs = form.classIs.value;
    const subject = form.subject.value;
    const paper = ` ${Number(form.paper.value) === 1 ? "1st" : "2nd"}`;
    const chapter_name = form.chapter_name.value;
    const chapter = parseInt(form.chapter.value);
    const quiz = { classIs, subject, paper, chapter_name, chapter, quizzes };

    try {
      await axiosSecure.post(`/quizzes`, quiz);
      setMessage("Quiz added successfully.");
      setQuizzes([]);
      form.reset();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-5xl">
      {message && (
        <p className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center font-semibold">
          {message}
        </p>
      )}

      <form
        onSubmit={handleFormSubmit}
        className="surface-card p-6 md:p-8"
      >
        <div className="page-header max-w-3xl">
          <span className="page-kicker">Admin Studio</span>
          <h1 className="page-title">Craft a new quiz set.</h1>
          <p className="page-subtitle">
            Build chapter-wise assessments with a stronger layout and clearer control
            over your question stack.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-4">
            <label className="label-text" htmlFor="classIs">
              Class
            </label>
            <select
              id="classIs"
              name="classIs"
              className="input-field"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Choose Class
              </option>
              <option value="Nine - Ten">Nine - Ten</option>
              <option value="Eleven - Twelve">Eleven - Twelve</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="label-text" htmlFor="subject">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="input-field"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Choose Subject
              </option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="math">Math</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="label-text" htmlFor="paper">
              Paper
            </label>
            <input
              type="number"
              id="paper"
              name="paper"
              placeholder="Paper"
              className="input-field"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label-text" htmlFor="chapter_name">
              Chapter Name
            </label>
            <input
              type="text"
              id="chapter_name"
              name="chapter_name"
              placeholder="Chapter Name"
              className="input-field"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label-text" htmlFor="chapter">
              Chapter
            </label>
            <input
              type="number"
              id="chapter"
              name="chapter"
              placeholder="Chapter"
              className="input-field"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label-text" htmlFor="addQuestions">
              Add questions
            </label>
            <div
              onClick={modalOpen}
              id="addQuestions"
              className="input-field cursor-pointer"
            >
              <h1>
                ({quizzes.length}) {quizzes.length < 2 ? "Question" : "Questions"}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="btn-primary">
            Add This Quiz
          </button>
        </div>
      </form>

      <AddQuestionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        quizzes={quizzes}
        setQuizzes={setQuizzes}
      />
    </div>
  );
};

export default AddQuiz;
