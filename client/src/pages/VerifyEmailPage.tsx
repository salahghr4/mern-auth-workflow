import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";
import { Link, useParams } from "react-router-dom";

export const VerifyEmailPage = () => {
  const { verifyEmail, isLoading } = useAuth();
  const [success, setSuccess] = useState(false);
  const { code } = useParams();

  useEffect(() => {
    const verify = async () => {
      const { success } = await verifyEmail(code ?? "");
      setSuccess(success);
    };
    verify();
  }, []);

  return (
    <div className="h-full flex justify-center mt-30">
      <div className="p-5 flex flex-col items-center gap-5 bg-slate-50 h-fit rounded-lg shadow-lg">
        {isLoading ? (
          <h1 className="text-2xl font-bold text-cyan-950 animate-pulse">
            Verifying email...
          </h1>
        ) : (
          <>
            <Alert status={success ? "success" : "error"}>
              {success
                ? "Email verified successfully"
                : "Failed to verify email"}
            </Alert>
            {!success && (
              <div className="flex gap-3 text-gray-950">
                <p>The link is invalid or expired.</p>
                <Link
                  to="/register"
                  className="text-cyan-950 underline"
                >
                  Get an new link
                </Link>
              </div>
            )}
            <Link
              to={"/"}
              className="text-cyan-950 underline"
            >
              Back home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
