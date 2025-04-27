import { useState } from "react";

export default function DateInput({ placeholder, style, name }) {
  const [type, setType] = useState("text");

  return (
    <input
      type={type}
      placeholder={placeholder}
      onFocus={() => setType("date")}
      onBlur={() => setType("text")}
      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      style={style}
      name={name}
    />
  );
}