import React, { useState } from "react";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import AddQuizSample from "./AddQuizSample";

const AddQuestionModal = ({
  isModalOpen,
  setIsModalOpen,
  quizzes,
  setQuizzes,
}) => {
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleChangeOptions = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const question = form.question.value;
    const options = [
      form.option1.value,
      form.option2.value,
      form.option3.value,
      form.option4.value,
    ];
    const answer = form.answer.value;

    // updating quiz state
    setQuizzes([
      ...quizzes,
      {
        number: quizzes.length + 1,
        question,
        options,
        answer,
      },
    ]);

    // setIsModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-green-200 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="question"
                  >
                    Question
                  </label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Question"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="text-center text-2xl">
                  <h1>Options :</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="option1"
                    >
                      Option 1
                    </label>
                    <input
                      onChange={handleChangeOptions}
                      type="text"
                      id="option1"
                      name="option1"
                      placeholder="Option 1"
                      value={options.option1}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="option2"
                    >
                      Option 2
                    </label>
                    <input
                      onChange={handleChangeOptions}
                      type="text"
                      id="option2"
                      name="option2"
                      placeholder="Option 2"
                      value={options.option2}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="option3"
                    >
                      Option 3
                    </label>
                    <input
                      onChange={handleChangeOptions}
                      type="text"
                      id="option3"
                      name="option3"
                      placeholder="Option 3"
                      value={options.option3}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="option4"
                    >
                      Option 4
                    </label>
                    <input
                      onChange={handleChangeOptions}
                      type="text"
                      id="option4"
                      name="option4"
                      placeholder="Option 4"
                      value={options.option4}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="classIs"
                  >
                    Correct answer
                  </label>
                  <select
                    id="answer"
                    name="answer"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Correct Answer
                    </option>
                    {Object.values(options).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
                    Submit
                  </button>
                </div>
              </form>
              {quizzes &&
                quizzes.map((quiz) => {
                  return <AddQuizSample key={quiz.number} quiz={quiz} />;
                })}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddQuestionModal;
