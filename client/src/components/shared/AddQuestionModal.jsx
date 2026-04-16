import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import AddQuizSample from "./AddQuizSample";
import {
  showConfirmAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/alerts";

const builderTabs = [
  { id: "manual", label: "Manual Making" },
  { id: "json-insert", label: "Json Insert" },
  { id: "json-guide", label: "Json Structure and Prompt" },
];

const emptyQuestionState = {
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  answer: "",
};

const quizStructureText = `{
  "classIs": "Nine - Ten",
  "subject": "physics",
  "paper": "1st",
  "chapter_name": "Motion",
  "chapter": 1,
  "quizzes": [
    {
      "question": "What is velocity?",
      "options": [
        "Speed with direction",
        "Only speed",
        "Only distance",
        "Only time"
      ],
      "answer": "Speed with direction"
    },
    {
      "question": "Which quantity is scalar?",
      "options": [
        "Velocity",
        "Acceleration",
        "Speed",
        "Force"
      ],
      "answer": "Speed"
    },
    {
      "question": "SI unit of force is?",
      "options": [
        "Joule",
        "Newton",
        "Watt",
        "Pascal"
      ],
      "answer": "Newton"
    }
  ]
}`;

const promptText = `Convert the provided quiz questions, image text, or MCQ content into strict JSON only.

Rules:
- Return only valid JSON.
- Do not add markdown, explanation, or extra text.
- Use this exact top-level structure:
  classIs, subject, paper, chapter_name, chapter, quizzes
- quizzes must be an array.
- Each quiz item must contain:
  question, options, answer
- options must contain exactly 4 strings.
- answer must exactly match one of the 4 options.
- Keep chapter as a number.
- Use paper as "1st" or "2nd".

JSON format:
${quizStructureText}`;

const normalizeImportedPaper = (paperValue) => {
  const normalizedValue = String(paperValue || "").trim().toLowerCase();

  if (!normalizedValue) {
    return "";
  }

  if (
    normalizedValue === "1" ||
    normalizedValue.startsWith("1st") ||
    normalizedValue.includes("first")
  ) {
    return 1;
  }

  if (
    normalizedValue === "2" ||
    normalizedValue.startsWith("2nd") ||
    normalizedValue.includes("second")
  ) {
    return 2;
  }

  return "";
};

const normalizeQuizzes = (quizzes) =>
  quizzes
    .map((quizItem, index) => {
      const rawOptions = Array.isArray(quizItem?.options)
        ? quizItem.options
        : [
            quizItem?.option1,
            quizItem?.option2,
            quizItem?.option3,
            quizItem?.option4,
          ];

      const options = rawOptions
        .slice(0, 4)
        .map((option) => String(option || "").trim());

      return {
        number: index + 1,
        question: String(quizItem?.question || "").trim(),
        options,
        answer: String(quizItem?.answer || "").trim(),
      };
    })
    .filter(
      (quizItem) =>
        quizItem.question &&
        quizItem.options.length === 4 &&
        quizItem.options.every(Boolean) &&
        quizItem.answer
    );

const extractImportPayload = (jsonInput) => {
  const parsed = JSON.parse(jsonInput);

  if (Array.isArray(parsed)) {
    return {
      quizzes: normalizeQuizzes(parsed),
      metadata: null,
    };
  }

  if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.quizzes)) {
    throw new Error(
      "JSON must be an object with a quizzes array or a direct array of questions."
    );
  }

  const chapterValue = Number(parsed.chapter);

  return {
    quizzes: normalizeQuizzes(parsed.quizzes),
    metadata: {
      classIs: String(parsed.classIs || "").trim(),
      subject: String(parsed.subject || "").trim(),
      paper: normalizeImportedPaper(parsed.paper),
      chapter_name: String(parsed.chapter_name || "").trim(),
      chapter: Number.isFinite(chapterValue) ? chapterValue : "",
    },
  };
};

const AddQuestionModal = ({
  isModalOpen,
  setIsModalOpen,
  quizzes,
  setQuizzes,
  onImportMetadata,
}) => {
  const [formState, setFormState] = useState(emptyQuestionState);
  const [editingQuestionNumber, setEditingQuestionNumber] = useState(null);
  const [activeTab, setActiveTab] = useState("manual");
  const [jsonInput, setJsonInput] = useState("");
  const [copiedSection, setCopiedSection] = useState("");

  useEffect(() => {
    if (!isModalOpen) {
      setFormState(emptyQuestionState);
      setEditingQuestionNumber(null);
      setActiveTab("manual");
      setJsonInput("");
      setCopiedSection("");
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!copiedSection) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedSection("");
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [copiedSection]);

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

  const handleJsonImport = async () => {
    try {
      const { quizzes: importedQuizzes, metadata } = extractImportPayload(jsonInput);

      if (importedQuizzes.length === 0) {
        throw new Error(
          "No valid questions were found. Each question needs 4 options and one answer."
        );
      }

      setQuizzes(importedQuizzes);
      setEditingQuestionNumber(null);
      setFormState(emptyQuestionState);

      if (metadata && onImportMetadata) {
        onImportMetadata(metadata);
      }

      await showSuccessAlert(
        "JSON Imported",
        `${importedQuizzes.length} question${
          importedQuizzes.length > 1 ? "s were" : " was"
        } loaded into the builder.`
      );
    } catch (error) {
      await showErrorAlert("JSON Import Failed", error.message);
    }
  };

  const handleCopy = async (sectionName, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedSection(sectionName);
    } catch (error) {
      await showErrorAlert("Copy Failed", "Clipboard access is not available.");
    }
  };

  const deleteSingleQuiz = async (quiz) => {
    const result = await showConfirmAlert({
      title: "Delete Question?",
      text: "This question will be removed from the quiz builder.",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) {
      return;
    }

    const filteredQuiz = quizzes.filter((quizItem) => quizItem !== quiz);
    setQuizzes(normalizeQuizzes(filteredQuiz));

    if (editingQuestionNumber === quiz.number) {
      setFormState(emptyQuestionState);
      setEditingQuestionNumber(null);
    }
  };

  const editSingleQuiz = (quiz) => {
    setActiveTab("manual");
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
            className="surface-card w-full max-w-5xl p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 md:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="page-kicker">
                  {editingQuestionNumber ? "Edit Question" : "Question Builder"}
                </span>
                <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
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

            <div className="mt-8 flex flex-wrap gap-2">
              {builderTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-[linear-gradient(135deg,var(--primary),var(--primary-light))] text-white shadow-[0_10px_18px_rgba(67,56,202,0.2)]"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "manual" && (
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
                  {["option1", "option2", "option3", "option4"].map(
                    (optionName, index) => (
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
                    )
                  )}
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
            )}

            {activeTab === "json-insert" && (
              <div className="mt-8 space-y-4">
                <div className="surface-card-soft p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Paste quiz JSON
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        You can paste a full quiz object or only an array of
                        question objects. If full quiz metadata is included, the
                        form will update it where possible.
                      </p>
                    </div>
                  </div>

                  <textarea
                    value={jsonInput}
                    onChange={(event) => setJsonInput(event.target.value)}
                    placeholder={quizStructureText}
                    className="input-field mt-4 min-h-[260px] resize-y font-mono text-xs leading-6"
                  />

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleJsonImport}
                    >
                      Submit JSON
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setJsonInput("")}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "json-guide" && (
              <div className="mt-8 grid gap-5">
                <div className="surface-card-soft p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        JSON Structure
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Copy this structure and replace the sample values.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      onClick={() => handleCopy("structure", quizStructureText)}
                    >
                      {copiedSection === "structure" ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={quizStructureText}
                    className="input-field mt-4 min-h-[260px] resize-y font-mono text-xs leading-6"
                  />
                </div>

                <div className="surface-card-soft p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Prompt
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Use this with any AI tool to get structured JSON output.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      onClick={() => handleCopy("prompt", promptText)}
                    >
                      {copiedSection === "prompt" ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={promptText}
                    className="input-field mt-4 min-h-[300px] resize-y font-mono text-xs leading-6"
                  />
                </div>
              </div>
            )}

            <div className="mt-8">
              <div className="flex items-center justify-between gap-3">
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
