
type buttonProps = {
  children: string;
  disabled: boolean;
};

const Button = ({ children, disabled }: buttonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-cyan-500 h-[38px] px-2 rounded-md disabled:bg-cyan-100 disabled:cursor-not-allowed  text-white font-medium cursor-pointer hover:bg-sky-400 transition-colors duration-300"
    >
      {children}
    </button>
  );
};

export default Button;
