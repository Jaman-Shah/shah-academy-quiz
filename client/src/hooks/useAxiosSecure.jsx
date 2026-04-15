import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { apiBaseUrl } from "./useAxiosCommon";

const axiosSecure = axios.create({
  baseURL: apiBaseUrl,
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers = config.headers || {};
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await logoutUser();
          } catch (logoutError) {
            console.log(logoutError.message);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logoutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
