import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const useGetQuizzes = (classIs, subject) => {
  const axiosCommon = useAxiosCommon();
  const {
    data: quizzes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["quizzes", classIs, subject],
    queryFn: async () => {
      const response = await axiosCommon(
        `/quizzes?classIs=${classIs}&subject=${subject}`
      );
      return response.data;
    },
  });
  return { quizzes, isLoading, refetch };
};

export default useGetQuizzes;
