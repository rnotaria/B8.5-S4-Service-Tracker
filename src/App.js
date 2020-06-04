import React, { useEffect } from "react";
import Board from "./Components/Board";
import MilageBar from "./Components/MilageBar";

function App() {
  // useEffect(() => {
  //   document.body.style.background = "black";
  // }, []);

  return (
    <React.Fragment>
      <MilageBar />
    </React.Fragment>
  );
}

export default App;
