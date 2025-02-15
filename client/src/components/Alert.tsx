import React from "react";

type AlertProps = {
  status: "success" | "error";
  children: React.ReactNode;
};

const Alert = ({ status, children }: AlertProps) => {
  const colors = {
    success: "bg-green-100",
    error: "bg-amber-100",
  };
  return (
    <div
      className={`p-3 ${colors[status]} w-fit flex items-center justify-center gap-3 rounded-lg`}
    >
      {status === "success" ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check rounded-full p-1 bg-emerald-300"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="text-gray-900">{children}</span>
        </>
      ) : (
        <>
          <span className="w-6 h-6 flex items-center justify-center p1 rounded-full bg-red-300 bg-">
            !
          </span>
          <span className="text-gray-900">{children}</span>
        </>
      )}
    </div>
  );
};

export default Alert;
