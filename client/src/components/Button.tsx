type buttonProps = {
  children: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({ children, disabled, isLoading, onClick }: buttonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-cyan-900 h-[38px] px-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center text-white font-medium cursor-pointer hover:bg-slate-700 transition-colors duration-300"
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-loader-circle animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
