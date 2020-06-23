import React, { useState } from "react";

export default function useInput(inputValue = "") {
  const [value, setValue] = useState(inputValue);
  const input = (
    <input value={value} onChange={(e) => setValue(e.target.value)} />
  );
  return [value, input];
}
