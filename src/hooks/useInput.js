import React, { useState } from "react";

export default function useInput(
  setState = "",
  placeholder = "",
  className = null
) {
  const [value, setValue] = useState(setState);
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
  return [value, input];
}
