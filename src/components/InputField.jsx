import React from "react";

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-black w-full p-2 mt-7 text-xl font-light rounded-lg shadow-inner shadow-black focus:outline-none focus:ring-2 focus:ring-red-600"
    />
  );
};

export default InputField;
