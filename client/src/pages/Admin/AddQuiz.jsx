import React, { useState } from "react";
import AddQuestionModal from "../../components/shared/AddQuestionModal";

const AddQuiz = () => {
  // quizzes state

  const [quizzes, setQuizzes] = useState([]);

  // modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // form submission functionalities
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const classIs = form.classIs.value;
    const subject = form.subject.value;
    const paper = ` ${form.paper.value === 1 ? "1st" : "2nd"}`;
    const chapter_name = form.chapter_name.value;
    const chapter = parseInt(form.chapter.value);
    console.log(classIs, subject, paper, chapter_name, chapter);
  };

  // adding questions modal opening function

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="classIs"
            >
              Class
            </label>
            <select
              id="classIs"
              name="classIs"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="classIs"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="paper"
            >
              Paper
            </label>
            <input
              type="number"
              id="paper"
              name="paper"
              placeholder="Paper"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="chapter_name"
            >
              Chapter Name
            </label>
            <input
              type="text"
              id="chapter_name"
              name="chapter_name"
              placeholder="Chapter Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="chapter"
            >
              Chapter
            </label>
            <input
              type="number"
              id="chapter"
              name="chapter"
              placeholder="Chapter"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="addQuestions"
            >
              Add questions
            </label>
            <div
              onClick={modalOpen}
              id="addQuestions"
              className="shadow cursor-pointer appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              +
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
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
