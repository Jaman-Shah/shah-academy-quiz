import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const useGetSingleQuiz = (id) => {
  const axiosCommon = useAxiosCommon();
  const {
    data: quiz = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["quiz", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await axiosCommon(`/quizzes/${id}`);
      return response.data;
    },
  });
  return { quiz, isLoading, refetch };
};

export default useGetSingleQuiz;
