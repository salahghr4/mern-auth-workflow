import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { axiosInstance, TokenRefreshClient } from "../api/apiClient";
import {
  AuthContextType,
  ErrorType,
  ApiResponse,
  User,
} from "../types/authTypes";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError) => {
        const { config = {} as InternalAxiosRequestConfig, response } = error;
        const { status, data } = response as AxiosResponse<ApiResponse>;

        if (status === 401 && data.errorCode === "InvalidAccessToken") {
          setIsLoading(true);
          try {
            const res = await TokenRefreshClient.get<any, ApiResponse>(
              "/auth/refresh-token"
            );
            setToken(res.accessToken ?? "");
            config.headers.Authorization = `Bearer ${res.accessToken}`;
            return TokenRefreshClient(config);
          } catch (refreshTokenError) {
            setToken(null);
            setUser(null);
          } finally {
            setIsLoading(false);
          }
        }

        return Promise.reject({ status, ...data });
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get<any, ApiResponse>("/user/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.user as User);
      } catch (error: any) {
        console.log(error);
      }
    };
    getUser();
  }, []);

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

  const logOut = async () => {
    setIsLoading(true);
    await axios({
      method: "POST",
      url: "auth/logout",
    });
    setUser(null);
    setToken(null);
    setIsLoading(false);
    navigate("/login");
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
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
