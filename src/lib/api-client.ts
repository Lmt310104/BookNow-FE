import Axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Request interceptor to attach JSON headers and token
function authRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  if (config.headers) {
    config.headers.Accept = "application/json";
    const token = localStorage.getItem("token"); // Retrieve token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
  }
  config.withCredentials = true; // Include credentials with requests
  return config;
}

// Create an Axios instance
export const api = Axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Attach request interceptor
api.interceptors.request.use(authRequestInterceptor);

// Response interceptor to handle responses and errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { data, status } = error.response;
      switch (status) {
        case 400:
          console.error("Bad Request:", data);
          break;

        case 401: {
          // const searchParams = new URLSearchParams(window.location.search);
          // const redirectTo =
          //   searchParams.get("redirectTo") || window.location.pathname;
          // window.location.href = `/auth/sign-in?redirectTo=${encodeURIComponent(
          //   redirectTo
          // )}`;
          console.error("Unauthorized access");
          break;
        }

        case 404:
          console.error("Resource not found: /not-found");
          break;

        case 500:
          console.error("Server error: /server-error");
          break;

        default:
          console.error("An unknown error occurred:", data);
      }
    } else {
      console.error("Network or CORS issue:", error.message);
    }
    return Promise.reject(error);
  }
);
