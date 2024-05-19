import React from "react";

const FormInput = React.forwardRef(function FormInput(
  { label, type, placeholder, style, initialValue = "", ...props },
  ref
) {
  return (
    <div className={`flex flex-col ${style}`}>
      <label className="font-bold text-sm text-black" htmlFor={placeholder}>
        {label}
      </label>
      <input
        className="px-3 py-2 border-2 border-gray-100 placeholder:text-neutral-400 rounded-md mt-1 w-fit lg:w-96 focus:border-primary focus:outline-primary duration-300"
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
