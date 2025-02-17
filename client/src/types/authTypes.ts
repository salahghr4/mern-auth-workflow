export type User = {
  id: string;
  username: string;
  email: string;
  verified: boolean;
};

export type ApiResponse = {
  accessToken?: string;
  user?: User;
  message?: string;
};

export type ErrorType = {
  status: number;
  message?: string;
  errors?: { path: string; message: string }[];
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  error: ErrorType | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  verifyEmail: (code: string) => Promise<{ success: boolean }>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  resetPassword: (password: string, verificationCode: string) => Promise<void>;
  logOut: () => Promise<void>;
};
