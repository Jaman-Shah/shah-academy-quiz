import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetAttendanceHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: attendanceHistory = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["attendance-history", user?.uid],
    enabled: Boolean(user),
    queryFn: async () => {
      const response = await axiosSecure("/attendance/me");
      return Array.isArray(response.data) ? response.data : [];
    },
  });

  return { attendanceHistory, isLoading, refetch };
};

export default useGetAttendanceHistory;
