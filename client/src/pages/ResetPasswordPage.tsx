import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, resetPassword } = useAuth();

  const [serachParams] = useSearchParams();
  const code = serachParams.get("code") ?? "";
  const expiresAt = Number(serachParams.get("expiresAt"));
  const isLinkValid = code && expiresAt && Date.now() < expiresAt;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(password, code);
  };

  return (
    <div className="grid place-items-center min-h-screen backdrop-blur-2xl">
      <div className="w-auto sm:w-md flex gap-5 items-center justify-center flex-col py-6 px-8 shadow-sm rounded-xl bg-white">
        {!isLinkValid ? (
          <>
            <Alert status="error">Invalid link</Alert>
            <p className="text-gray-900">
              The link is either invalid or expired.
            </p>
            <Link
              to={"/password/forgot"}
              className="underline text-cyan-950 cursor-pointer"
            >
              Request a new password reset link
            </Link>
          </>
        ) : (
          <form
            className="w-full sm:w-md px-8 flex items-center justify-center flex-col"
            onSubmit={handleSubmit}
            noValidate
          >
            <h1 className="text-2xl font-bold text-gray-900">
              Reset your Password
            </h1>
            <div className="w-full py-3 px-2 mt-5 space-y-6">
              <div>
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="text-gray-500">
                  - Password must be at least 8 characters long
                </small>
              </div>
              <Input
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                disabled={
                  !password ||
                  password.length < 6 ||
                  password !== confirmPassword
                }
                isLoading={isLoading}
              >
                Reset password
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
