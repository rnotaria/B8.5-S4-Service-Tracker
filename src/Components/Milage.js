import React, { useState } from "react";

// function convertMilage

export default function Milage() {
  const [milage, setMilage] = useState("000000");

  return (
    <div>
      <h1>{milage}</h1>
      <button>Set Milage</button>
    </div>
  );
}
