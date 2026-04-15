import axios from "axios";

export const apiBaseUrl =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const axiosCommon = axios.create({
  baseURL: apiBaseUrl,
});

const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
