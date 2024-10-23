import { api } from "@/lib/api-client";
import { User } from "@/types/user";

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

  async resetPassword(){
    
  }
}

export default new AuthService();
