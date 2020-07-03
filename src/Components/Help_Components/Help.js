import React from "react";
import Popup from "reactjs-popup";
import Pages from "./Pages";
import styles from "../../Styles/HelpStyles.module.css";
import help1 from "../../other/help_videos/help1.mp4";
import help2 from "../../other/help_videos/help2.mp4";
import help3 from "../../other/help_videos/help3.mp4";
import help4 from "../../other/help_videos/help4.mp4";

const contentStyle = {
  height: "800px",
  width: "700px",
  border: "1px solid black",

  backgroundColor: "rgba(100, 100, 100, 0.8)",
};

const video = (src) => {
  return (
    <div className={styles.videoContainer}>
      <video loop width="700px" autostart autoPlay src={src} type="video/mp4" />
    </div>
  );
};

const text = (content) => {
  return <div className={styles.textContainer}>{content}</div>;
};

const step1 = (
  <div>
    {video(help1)}
    {text("You can view tasks for different services by clicking the header.")}
  </div>
);
const step2 = (
  <div>
    {video(help2)}
    {text(
      'The info button brings up the Information Panel and provides more details on a particular task such as instructions, parts, and helpful links. When you complete a task by dragging it into the "Complete" column, you can provide additional information like cost and date of service. This will be added to the Information Panel.'
    )}
  </div>
);
const step3 = (
  <div>
    {video(help3)}
    {text(
      <span className={styles.text}>
        Press the "-" to activate delete mode followed by clicking any tasks you
        want to remove from the list. Be sure to deactivate delete mode by
        pressing the "-" when you are done. You can add custom tasks to the list
        by pressing +. This will bring up a panel where you can type in the task
        name. You can then click the (info button) to bring up the information
        panel and click (edit) to add details to your task.
      </span>
    )}
  </div>
);
const step4 = (
  <div>
    {video(help4)}
    {text("You can view tasks for different services by clicking the header.")}
  </div>
);
const content = [step1, step2, step3, step4];

export default function Help({ open, handleOnClose }) {
  return (
    <div className={styles.center}>
      <Popup
        modal={true}
        contentStyle={contentStyle}
        open={open}
        onClose={() => handleOnClose()}
      >
        <Pages onClose={handleOnClose} content={content} />
      </Popup>
    </div>
  );
}
