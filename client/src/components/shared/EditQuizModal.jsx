import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import AddQuestionModal from "./AddQuestionModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  getErrorMessage,
  showErrorAlert,
  showSuccessAlert,
} from "../../utils/alerts";

const EditQuizModal = ({ isOpen, setIsOpen, quizData, onSaved }) => {
  const axiosSecure = useAxiosSecure();
  const [formState, setFormState] = useState({
    classIs: "",
    subject: "",
    paper: 1,
    chapter_name: "",
    chapter: "",
  });
  const [quizzes, setQuizzes] = useState([]);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  useEffect(() => {
    if (!quizData) {
      return;
    }

    setFormState({
      classIs: quizData.classIs || "",
      subject: quizData.subject || "",
      paper: String(quizData.paper || "").includes("1st") ? 1 : 2,
      chapter_name: quizData.chapter_name || quizData.title || "",
      chapter: quizData.chapter || "",
    });
    setQuizzes(Array.isArray(quizData.quizzes) ? quizData.quizzes : []);
  }, [quizData]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (quizzes.length < 3) {
      await showErrorAlert(
        "Quiz Not Ready",
        "Add at least 3 questions before updating the quiz."
      );
      return;
    }

    const payload = {
      classIs: formState.classIs,
      subject: formState.subject,
      paper: ` ${Number(formState.paper) === 1 ? "1st" : "2nd"}`,
      chapter_name: formState.chapter_name,
      chapter: parseInt(formState.chapter, 10),
      quizzes,
    };

    try {
      await axiosSecure.patch(`/quizzes/${quizData._id}`, payload);
      await showSuccessAlert("Quiz Updated", "The quiz was updated.");
      onSaved?.("Quiz updated successfully.");
      setIsOpen(false);
    } catch (error) {
      await showErrorAlert("Quiz Update Failed", getErrorMessage(error));
    }
  };

  if (!quizData) {
    return null;
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-20 focus:outline-none"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 z-20 w-screen overflow-y-auto bg-slate-950/40 px-4 py-8">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="surface-card w-full max-w-5xl p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="page-kicker">Manage Quiz</span>
                  <h2 className="mt-4 text-3xl font-bold text-slate-900">
                    Edit quiz details and questions
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="label-text" htmlFor="edit-classIs">
                      Class
                    </label>
                    <select
                      id="edit-classIs"
                      name="classIs"
                      value={formState.classIs}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="" disabled>
                        Choose Class
                      </option>
                      <option value="Nine - Ten">Nine - Ten</option>
                      <option value="Eleven - Twelve">Eleven - Twelve</option>
                    </select>
                  </div>

                  <div>
                    <label className="label-text" htmlFor="edit-subject">
                      Subject
                    </label>
                    <select
                      id="edit-subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="input-field"
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

                  <div>
                    <label className="label-text" htmlFor="edit-paper">
                      Paper
                    </label>
                    <input
                      type="number"
                      id="edit-paper"
                      name="paper"
                      value={formState.paper}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="label-text" htmlFor="edit-chapter-name">
                      Chapter Name
                    </label>
                    <input
                      type="text"
                      id="edit-chapter-name"
                      name="chapter_name"
                      value={formState.chapter_name}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="label-text" htmlFor="edit-chapter">
                      Chapter
                    </label>
                    <input
                      type="number"
                      id="edit-chapter"
                      name="chapter"
                      value={formState.chapter}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="label-text" htmlFor="edit-questions">
                      Questions
                    </label>
                    <button
                      type="button"
                      id="edit-questions"
                      className="input-field cursor-pointer text-left"
                      onClick={() => setIsQuestionModalOpen(true)}
                    >
                      {quizzes.length} questions added. Click to manage.
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="submit" className="btn-primary">
                    Update Quiz
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsQuestionModalOpen(true)}
                  >
                    Edit Questions
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <AddQuestionModal
        isModalOpen={isQuestionModalOpen}
        setIsModalOpen={setIsQuestionModalOpen}
        quizzes={quizzes}
        setQuizzes={setQuizzes}
        onImportMetadata={handleImportMetadata}
      />
    </>
  );
};

export default EditQuizModal;
