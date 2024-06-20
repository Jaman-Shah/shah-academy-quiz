import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const useGetQuizzes = (classIs, subject) => {
  const axiosCommon = useAxiosCommon();
  const {
    data: quizzes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const response = await axiosCommon(
        `/quizzes?class=${classIs}&subject=${subject}`
      );
      return response.data;
    },
  });
  return { quizzes, isLoading, refetch };
};

export default useGetQuizzes;
