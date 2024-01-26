import React from "react";

export default function LoginInput({
  props: { label, name, type, value, handleChange },
}) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
        autoComplete="on"
      />
    </>
  );
}
