import React from "react";
import "./index.css";
import RenderXMilageBoxes from "./Components/RenderXMilageBoxes";
import BottomPane from "./Components/BottomPane";

function App() {
  const currentMiles = 56001;

  return (
    <div>
      <h1 style={{ color: "red", textAlign: "center" }}>
        Current Miles: {currentMiles}
      </h1>
      <RenderXMilageBoxes currentMiles={currentMiles} numFutureServices={10} />

      <BottomPane height={80} paneTitle={"title"} />
    </div>
  );
}

export default App;
