import React, { useState } from "react";

export default function useInput(
  setState = "",
  placeholder = "",
  type = "text",
  className = null
) {
  const [value, setValue] = useState(setState);
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      type={type}
      className={className}
    />
  );
  return [value, input];
}
