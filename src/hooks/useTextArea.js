import React, { useState } from "react";

export default function useTextArea(setState = "") {
  const [value, setValue] = useState(setState);
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
