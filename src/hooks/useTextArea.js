import React, { useState } from "react";

export default function useTextArea(setState = "", placeholder = "") {
  const [value, setValue] = useState(setState);
  const textarea = (
    <textarea
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder={placeholder}
    />
  );
  return [value, textarea];
}
