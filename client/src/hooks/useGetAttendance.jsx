import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useGetAttendance = (email, quiz_id) => {
  const axiosCommon = useAxiosCommon();
  const {
    data: attendance = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["attendance", email, quiz_id],
    queryFn: async () => {
      const response = await axiosCommon(
        `/attendance?email=${email}&quiz_id=${quiz_id}`
      );
      return response.data;
    },
  });
  return { attendance, isLoading, refetch };
};

export default useGetAttendance;
