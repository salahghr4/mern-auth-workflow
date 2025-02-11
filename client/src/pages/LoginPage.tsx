import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="grid place-items-center min-h-screen backdrop-blur-2xl">
      <form
        className="max-w-md flex items-center justify-center flex-col w-full py-6 px-8 shadow-sm rounded-xl bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Sign in to your account
        </h1>
        <div className="w-full py-3 px-2 mt-5 space-y-6">
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error.message}
            </p>
          )}
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login(email, password)}
          />
          <Link
            to={"/password/forgot"}
            className="block -mt-5 underline text-cyan-500 cursor-pointer"
          >
            Forgot password ?
          </Link>
          <Button
            disabled={!email || password.length < 8 || isLoading}
            isLoading={isLoading}
          >
            Sign in
          </Button>
          <div className="flex justify-center gap-2 w-full">
            <p className="text-gray-900">Don't have an account?</p>
            <Link
              to={"/register"}
              className="underline text-cyan-500 cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
