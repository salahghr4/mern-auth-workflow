export type User = {
  id: string;
  username: string;
  email: string;
  verified: boolean;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type ErrorType = {
  status: number;
  message: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  error: ErrorType | null;
  login: (email: string, password: string) => void;
};
