import axios from "axios";

const normalizeBaseUrl = (url) => String(url || "").trim().replace(/\/+$/, "");

const resolvedBaseUrl =
  import.meta.env.VITE_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? "https://shahacademy-server.vercel.app"
    : "http://localhost:5000");

// Local development falls back to localhost. Production falls back to the
// deployed API if VITE_BASE_URL is missing in the built environment.
export const apiBaseUrl = normalizeBaseUrl(resolvedBaseUrl);

const axiosCommon = axios.create({
  baseURL: apiBaseUrl,
});

const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
