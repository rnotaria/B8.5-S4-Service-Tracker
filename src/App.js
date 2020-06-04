import React, { useEffect } from "react";
import MilageBox from "./Components/MilageBox";

function App() {
  const milageList = ["55,000", "65,000"];

  return (
    <React.Fragment>
      <MilageBox milageList={milageList} />
    </React.Fragment>
  );
}

export default App;
