import React from "react";

const InputField = ({ type, placeholder, value, onChange, name }) => {
  return (
    <input
      type={type}
      name={name} // Agregar el atributo name
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-black w-full p-2 text-xl font-light rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-red-600"
    />
  );
};

export default InputField;