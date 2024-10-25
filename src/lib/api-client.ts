import authService from "@/services/auth.service";
import Axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

export const getAccessToken = () => localStorage.getItem("token");
export const setAccessToken = (token: string) =>
  localStorage.setItem("token", token);

function authRequestInterceptor(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  if (config.headers) {
    config.headers.Accept = "application/json";

    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        const newToken = await authService.refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        console.error("Get new token success");
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Refresh token expired or invalid. Logging out",
          refreshError,
        );
        localStorage.removeItem("token");
        window.location.href = "/auth/sign-in";
      }
    }

    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 400:
          console.error("Bad Request:", error.response);
          break;
        case 404:
          console.error("Resource not found: /not-found", error.response);
          break;
        case 500:
          console.error("Server error: /server-error", error.response);
          break;
        default:
          console.error("An unknown error occurred:", error.response);
      }
    } else {
      console.error("Network or CORS issue:", error.message);
    }

    return Promise.reject(error);
  },
);
