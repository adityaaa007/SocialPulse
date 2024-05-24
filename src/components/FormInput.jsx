import React from "react";
import { useSelector } from "react-redux";

const FormInput = React.forwardRef(function FormInput(
  { label, type, placeholder, style, initialValue = "", ...props },
  ref
) {
  const lightTheme = useSelector((state) => state.settings.lightTheme);

  return (
    <div className={`flex flex-col ${style}`}>
      <label className={`font-bold text-sm text-black ${lightTheme ? 'text-black' : 'text-white'}`} htmlFor={placeholder}>
        {label}
      </label>
      <input
        className={`${
          lightTheme
            ? "border-neutral-200 bg-white text-black autofill:bg-white"
            : "border-neutral-800 bg-neutral-800 text-white autofill:bg-neutral-800"
        } px-3 py-2 border-2 placeholder:text-neutral-400 rounded-md mt-1 w-fit lg:w-96 focus:border-primary focus:outline-none duration-300`}
        id={placeholder}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
        defaultValue={initialValue}
      />
    </div>
  );
});

export default FormInput;
