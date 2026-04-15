import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import AddQuizSample from "./AddQuizSample";

const emptyQuestionState = {
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  answer: "",
};

const normalizeQuizzes = (quizzes) =>
  quizzes.map((quizItem, index) => ({
    ...quizItem,
    number: index + 1,
  }));

const AddQuestionModal = ({
  isModalOpen,
  setIsModalOpen,
  quizzes,
  setQuizzes,
}) => {
  const [formState, setFormState] = useState(emptyQuestionState);
  const [editingQuestionNumber, setEditingQuestionNumber] = useState(null);

  useEffect(() => {
    if (!isModalOpen) {
      setFormState(emptyQuestionState);
      setEditingQuestionNumber(null);
    }
  }, [isModalOpen]);

  const answerOptions = useMemo(
    () =>
      [
        formState.option1,
        formState.option2,
        formState.option3,
        formState.option4,
      ].filter(Boolean),
    [formState.option1, formState.option2, formState.option3, formState.option4]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
      ...(name !== "answer" && currentState.answer === currentState[name]
        ? { answer: "" }
        : {}),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextQuestion = {
      question: formState.question.trim(),
      options: [
        formState.option1.trim(),
        formState.option2.trim(),
        formState.option3.trim(),
        formState.option4.trim(),
      ],
      answer: formState.answer.trim(),
    };

    if (editingQuestionNumber) {
      const updatedQuizzes = quizzes.map((quizItem) =>
        quizItem.number === editingQuestionNumber
          ? { ...quizItem, ...nextQuestion }
          : quizItem
      );

      setQuizzes(normalizeQuizzes(updatedQuizzes));
    } else {
      setQuizzes(
        normalizeQuizzes([
          ...quizzes,
          {
            number: quizzes.length + 1,
            ...nextQuestion,
          },
        ])
      );
    }

    setFormState(emptyQuestionState);
    setEditingQuestionNumber(null);
  };

  const deleteSingleQuiz = (quiz) => {
    const filteredQuiz = quizzes.filter((quizItem) => quizItem !== quiz);
    setQuizzes(normalizeQuizzes(filteredQuiz));

    if (editingQuestionNumber === quiz.number) {
      setFormState(emptyQuestionState);
      setEditingQuestionNumber(null);
    }
  };

  const editSingleQuiz = (quiz) => {
    setEditingQuestionNumber(quiz.number);
    setFormState({
      question: quiz.question,
      option1: quiz.options?.[0] || "",
      option2: quiz.options?.[1] || "",
      option3: quiz.options?.[2] || "",
      option4: quiz.options?.[3] || "",
      answer: quiz.answer,
    });
  };

  return (
    <Dialog
      open={isModalOpen}
      as="div"
      className="relative z-20 focus:outline-none"
      onClose={() => setIsModalOpen(false)}
    >
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto bg-slate-950/40 px-4 py-8">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="surface-card w-full max-w-4xl p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 md:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="page-kicker">
                  {editingQuestionNumber ? "Edit Question" : "Question Builder"}
                </span>
                <h2 className="mt-4 text-3xl font-bold text-slate-900">
                  {editingQuestionNumber
                    ? `Update question ${editingQuestionNumber}`
                    : "Add questions to your quiz"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="label-text" htmlFor="question">
                  Question
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  placeholder="Write the question"
                  value={formState.question}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {["option1", "option2", "option3", "option4"].map((optionName, index) => (
                  <div key={optionName}>
                    <label className="label-text" htmlFor={optionName}>
                      Option {index + 1}
                    </label>
                    <input
                      type="text"
                      id={optionName}
                      name={optionName}
                      placeholder={`Option ${index + 1}`}
                      value={formState[optionName]}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="label-text" htmlFor="answer">
                  Correct answer
                </label>
                <select
                  id="answer"
                  name="answer"
                  className="input-field"
                  value={formState.answer}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select the correct answer
                  </option>
                  {answerOptions.map((option, index) => (
                    <option key={`${option}-${index}`} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn-primary">
                  {editingQuestionNumber ? "Update Question" : "Add Question"}
                </button>
                {editingQuestionNumber && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setEditingQuestionNumber(null);
                      setFormState(emptyQuestionState);
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  Added Questions ({quizzes.length})
                </h3>
                <p className="text-sm text-slate-500">
                  Minimum 3 questions are required per quiz.
                </p>
              </div>

              {quizzes.length === 0 ? (
                <div className="surface-card-soft mt-4 p-6 text-sm text-slate-500">
                  No questions added yet.
                </div>
              ) : (
                quizzes.map((quiz) => (
                  <AddQuizSample
                    key={quiz.number}
                    quiz={quiz}
                    deleteSingleQuiz={deleteSingleQuiz}
                    editSingleQuiz={editSingleQuiz}
                  />
                ))
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddQuestionModal;
