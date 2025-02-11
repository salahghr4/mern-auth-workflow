import React, { HTMLInputTypeAttribute } from "react";

type InputProps = {
  label: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label className="block font-medium text-gray-900">{label}</label>
      <div className="mt-2">
        <input
          {...props}
          className="w-full text-gray-900 py-1.5 px-3 rounded-md outline-1 -outline-offset-1 outline-gray-300  focus:outline-cyan-500 focus:outline-2"
        />
      </div>
    </div>
  );
};

export default Input;
