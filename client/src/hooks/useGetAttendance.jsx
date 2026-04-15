import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetAttendance = (quiz_id) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: attendance = null,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["attendance", user?.uid, quiz_id],
    enabled: Boolean(user && quiz_id),
    queryFn: async () => {
      const response = await axiosSecure(`/attendance?quiz_id=${quiz_id}`);
      return response.data;
    },
  });
  return { attendance, isLoading, refetch };
};

export default useGetAttendance;
