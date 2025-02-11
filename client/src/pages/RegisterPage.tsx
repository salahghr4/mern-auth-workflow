import { Link } from "react-router-dom";
import Input from "../components/Input";
import React, { useState } from "react";
import Button from "../components/Button";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, email, password);
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <form
        className="max-w-md flex items-center justify-center flex-col w-full py-6 px-8 shadow-sm rounded-xl bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <div className="w-full py-3 px-2 mt-8 space-y-6">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            disabled={
              !email || password.length < 8 || password !== confirmPassword
            }
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
