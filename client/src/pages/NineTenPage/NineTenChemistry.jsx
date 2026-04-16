import useGetQuizzes from "../../hooks/useGetQuizzes";
import QuizNameCard from "../../components/shared/QuizNameCard";
import CompanyDetails from "../../components/shared/CompanyDetails";

const NineTenChemistry = () => {
  const { quizzes } = useGetQuizzes("Nine - Ten", "chemistry");

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--primary),var(--primary-light)_58%,var(--primary-dark))] px-5 py-6 text-white shadow-[0_18px_36px_rgba(67,56,202,0.22)] sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="page-header max-w-2xl">
            <span className="inline-flex rounded-full bg-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Nine - Ten Chemistry
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Chemistry
            </h1>
          </div>

          <CompanyDetails compact tone="dark" />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5">
        {quizzes &&
          quizzes.map((quiz, index) => {
            return (
              <QuizNameCard
                key={quiz._id}
                quiz={quiz}
                index={quizzes.length - index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NineTenChemistry;
