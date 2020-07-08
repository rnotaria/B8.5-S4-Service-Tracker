import React, { useState } from "react";

export default function useDropDown(list = [], className = null) {
  const [value, setValue] = useState(list[0]);

  const dropDown = (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      {list.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </select>
  );

  return [value, dropDown];
}
