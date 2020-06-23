import React, { useState } from "react";

export default function useTextArea(inputValue = "") {
  const [value, setValue] = useState(inputValue);
  const textarea = (
    <textarea
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder="Enter relevant completion notes such as cost, material used, etc."
    />
  );
  return [value, textarea];
}
