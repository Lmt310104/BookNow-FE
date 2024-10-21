import {
  createContext,
  FC,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { jwtDecode } from "jwt-decode";

export interface AuthState {
  userId: string;
  role: string;
}

export interface AuthContextValue {
  auth: AuthState | null;
  setAuth: Dispatch<SetStateAction<AuthState | null>>;
}

export interface JWTDecode {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState | null>(() => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      const { id, role }: JWTDecode = jwtDecode(token);
      console.log(id, role);
      return {
        userId: id,
        role: role,
      };
    }
    return null;
  });
  const value: AuthContextValue = { auth, setAuth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
