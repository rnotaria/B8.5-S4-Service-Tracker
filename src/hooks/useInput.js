import React, { useState } from "react";

export default function useInput(
  setState = "",
  placeholder = "",
  type = "text",
  className = null,
  autofocus = false
) {
  const [value, setValue] = useState(setState);

  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      type={type}
      className={className}
      autoFocus={autofocus}
    />
  );
  return [value, input];
}
