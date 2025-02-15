import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const { isLoading, sendResetPasswordEmail } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendResetPasswordEmail(email);
    setIsSent(true);
  };
  return (
    <div className="grid place-items-center min-h-screen backdrop-blur-2xl">
      <div className="w-auto sm:w-md flex gap-5 items-center justify-center flex-col py-6 px-8 shadow-sm rounded-xl bg-white">
        {isSent ? (
          <>
            <Alert status="success">Reset link has been sent</Alert>
            <p className="text-gray-900">
              Please check your <span className="text-cyan-950">{email}</span>{" "}
              inbox.
            </p>
          </>
        ) : (
          <form
            className="w-full sm:w-md px-8 flex items-center justify-center flex-col"
            onSubmit={handleSubmit}
            noValidate
          >
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <div className="w-full py-3 px-2 mt-5 space-y-6">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                disabled={
                  !email ||
                  email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/) === null
                }
                isLoading={isLoading}
              >
                Send reset link
              </Button>
            </div>
          </form>
        )}
        <div className="flex justify-center gap-2 w-full">
          <p className="text-gray-900">Go back to</p>
          <Link
            to={"/login"}
            className="underline text-cyan-950 cursor-pointer"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
