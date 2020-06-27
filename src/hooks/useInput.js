import React, { useState } from "react";

export default function useInput(setState = "", placeholder = "") {
  const [value, setValue] = useState(setState);
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
  return [value, input];
}
