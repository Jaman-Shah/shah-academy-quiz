import React, { useState } from "react";
import AddQuestionModal from "../../components/shared/AddQuestionModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  getErrorMessage,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/alerts";

const AddQuiz = () => {
  const axiosSecure = useAxiosSecure();
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    classIs: "",
    subject: "",
    paper: 1,
    chapter_name: "",
    chapter: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const handleImportMetadata = (metadata) => {
    setFormState((currentState) => ({
      classIs: metadata.classIs || currentState.classIs,
      subject: metadata.subject || currentState.subject,
      paper: metadata.paper || currentState.paper,
      chapter_name: metadata.chapter_name || currentState.chapter_name,
      chapter:
        metadata.chapter === "" || metadata.chapter === undefined
          ? currentState.chapter
          : metadata.chapter,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (quizzes.length < 3) {
      await showErrorAlert(
        "Quiz Not Ready",
        "Insert at least 3 questions."
      );
      return;
    }

    const classIs = formState.classIs;
    const subject = formState.subject;
    const paper = ` ${Number(formState.paper) === 1 ? "1st" : "2nd"}`;
    const chapter_name = formState.chapter_name;
    const chapter = parseInt(formState.chapter, 10);
    const quiz = { classIs, subject, paper, chapter_name, chapter, quizzes };

    try {
      await axiosSecure.post(`/quizzes`, quiz);
      await showSuccessAlert("Quiz Added", "The quiz was created.");
      setQuizzes([]);
      setFormState({
        classIs: "",
        subject: "",
        paper: 1,
        chapter_name: "",
        chapter: "",
      });
    } catch (error) {
      await showErrorAlert("Quiz Add Failed", getErrorMessage(error));
    }
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <form
        onSubmit={handleFormSubmit}
        className="surface-card p-6 md:p-8"
      >
        <div className="page-header max-w-3xl">
          <span className="page-kicker">Admin Studio</span>
          <h1 className="page-title">Add Quiz</h1>
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
              value={formState.classIs}
              onChange={handleChange}
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
              value={formState.subject}
              onChange={handleChange}
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
              value={formState.paper}
              onChange={handleChange}
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
              value={formState.chapter_name}
              onChange={handleChange}
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
              value={formState.chapter}
              onChange={handleChange}
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
        onImportMetadata={handleImportMetadata}
      />
    </div>
  );
};

export default AddQuiz;
