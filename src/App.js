import React, { useEffect } from "react";
import Board from "./Components/Board";
import MilageBar from "./Components/MilageBar";

function App() {
  const milageList = ["55,000", "65,000"];

  return (
    <React.Fragment>
      <MilageBar milageList={milageList} />
    </React.Fragment>
  );
}

export default App;
