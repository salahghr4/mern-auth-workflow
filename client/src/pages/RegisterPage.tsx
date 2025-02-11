import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, isLoading, register } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({ email, username, password, confirmPassword });
  };

  const renderError = (path: string) => {
    if (error) {
      return error.errors?.map(
        (err) =>
          err.path === path && (
            <small
              className="text-red-500"
              key={err.path}
            >
              - {err.message}
            </small>
          )
      );
    }
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <form
        className="max-w-md flex items-center justify-center flex-col w-full py-6 px-8 shadow-sm rounded-xl bg-white"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <div className="w-full py-3 px-2 mt-8 space-y-6">
          <div>
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {renderError("username")}
          </div>
          <div>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {renderError("email")}
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!error && (
              <small className="text-gray-500">
                - Password must be at least 8 characterslong
              </small>
            )}
            {renderError("password")}
          </div>
          <div>
            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {renderError("confirmPassword")}
          </div>
          <Button
            disabled={
              !email ||
              !username ||
              password.length < 8 ||
              password !== confirmPassword
            }
            isLoading={isLoading}
          >
            Sign up
          </Button>
          <div className="flex justify-center gap-2 w-full">
            <p className="text-gray-900">Already have an account ?</p>
            <Link
              to={"/login"}
              className="underline text-cyan-500 cursor-pointer"
            >
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
