import React, { useState } from "react";
import SlidingPane from "../utils/react-sliding-pane/react-sliding-pane";
import "../utils/react-sliding-pane/react-sliding-pane.css";

export default function BottomPane({ height, marginTop }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={() => setOpen(true)}>Click</button>
      <SlidingPane
        from="bottom"
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={open}
        onRequestClose={() => {
          setOpen(false);
        }}
        width="100%"
        height={height}
        marginTop={marginTop}
      >
        <div>And I am pane content. BTW, what rocks?</div>
      </SlidingPane>
    </div>
  );
}
