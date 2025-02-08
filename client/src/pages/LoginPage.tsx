import { Link } from "react-router-dom";
import Input from "../components/Input";
import React, { useState } from "react";
import Button from "../components/Button";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <form
        className="max-w-md flex items-center justify-center flex-col w-full py-6 px-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
        <div className="w-full py-3 px-2 mt-8 space-y-6">
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
          <Link to={"/password/forgot"} className="block -mt-5 underline text-cyan-500 cursor-pointer">Forgot password ?</Link>
          <Button disabled={!email || password.length < 8}>Sign up</Button>
          <div className="flex justify-center gap-2 w-full">
            <p className="text-gray-900">Don't have an account?</p>
            <Link
              to={"/register"}
              className="underline text-cyan-500 cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
