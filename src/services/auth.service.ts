import { api, getAccessToken, setAccessToken } from "@/lib/api-client";
import { User } from "@/types/user";
import axios from "axios";

class AuthService {
  async signInWithEmail(data: { email: string; password: string }) {
    return api.post("/auth/sign-in/email", data);
  }
  async signUpByEmail(data: User) {
    return api.post("/auth/sign-up/email", data);
  }
  async verificationEmail(data: { token: string }) {
    return api.post("/auth/verify-email", data);
  }
  async logOut() {
    return api.delete("/auth/sign-out");
  }

  async forgotPassword(email: string) {
    return api.post("/auth/forgot-password", { email: email });
  }

  async resetPassword() {}

  async refreshAccessToken(): Promise<string> {
    const token = getAccessToken();
    if (!token) throw new Error("No refresh token available");

    const response = await axios.get(
      "http://localhost:8080/api/v1/auth/refresh-token",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    const newAccessToken = response.data.access_token;
    console.log("this is newAccessToken", newAccessToken);
    setAccessToken(newAccessToken);
    return newAccessToken;
  }

  async signInWithGoogle() {
    
  }
}

export default new AuthService();
