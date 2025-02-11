import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiClient";
import {
  AuthContextType,
  ErrorType,
  LoginResponse,
  User,
} from "../types/authTypes";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios<LoginResponse>({
        method: "POST",
        url: "/auth/login",
        data: { email, password },
      });
      setToken(res.accessToken);
      setUser(res.user);
      navigate("/");
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user: user, isLoading, login, token, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
