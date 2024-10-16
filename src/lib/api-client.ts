import Axios, { InternalAxiosRequestConfig } from "axios";
import { useToast } from "@/hooks/use-toast";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { toast } = useToast();
    const statusCode = error.response?.status;
    const message = error.response?.data?.message || error.message;
    switch (statusCode) {
      case 401: {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo =
          searchParams.get("redirectTo") || window.location.pathname;
        window.location.href = `/auth/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`;
        break;
      }
      case 403:
        toast({
          title: "Không có quyền truy cập",
          description: "'Bạn không có quyền truy cập vào tài nguyên này",
        });
        break;
      case 404:
        toast({
          title: "Không tìm thấy trang",
          description: "Trang bạn đang tìm kiếm không tồn tại",
        });
        break;
      case 500:
        toast({
          title: "Lỗi máy chủ",
          description: "Đã xảy ra lỗi khi xử lý yêu cầu của bạn",
        });
        break;
      default:
        toast({
          title: "Lỗi",
          description: message,
        });
    }
    // Ghi log lỗi (có thể sử dụng một service ghi log)
    console.error("API Error:", error);

    return Promise.reject(error);
  },
);
