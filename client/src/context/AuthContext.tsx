import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiClient";
import {
  AuthContextType,
  ErrorType,
  ApiResponse,
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
      const res = await axios<ApiResponse>({
        method: "POST",
        url: "/auth/login",
        data: { email, password },
      });
      setToken(res.accessToken as string);
      setUser(res.user as User);
      navigate("/");
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios<ApiResponse>({
        method: "POST",
        url: "/auth/register",
        data,
      });
      setToken(res.accessToken as string);
      setUser(res.user as User);
      navigate("/");
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    setIsLoading(true);
    try {
      await axios<ApiResponse>({
        method: "PATCH",
        url: `/auth/email/verify/${code}`,
      });
      setUser((prev) => ({ ...prev, verified: true } as User));
      return { success: true };
    } catch (error: any) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const sendResetPasswordEmail = async (email: string) => {
    setIsLoading(true);
    await axios<void>({
      method: "POST",
      url: "/auth/password/forgot",
      data: { email },
    });
    setIsLoading(false);
  };

  const resetPassword = async (password: string, verificationCode: string) => {
    setIsLoading(true);
    try {
      await axios<ApiResponse>({
        method: "PATCH",
        url: "/auth/password/reset",
        data: { password, verificationCode },
      });
      setToken(null);
      setUser(null);
      navigate("/login");
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isLoading,
        login,
        token,
        error,
        register,
        verifyEmail,
        sendResetPasswordEmail,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
