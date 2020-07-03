import React from "react";
import Popup from "reactjs-popup";
import Pages from "./Pages";
import styles from "../../Styles/HelpStyles.module.css";
import help1 from "../../other/help_videos/help1.mp4";
import help2 from "../../other/help_videos/help2.mp4";
import help3 from "../../other/help_videos/help3.mp4";
import help4 from "../../other/help_videos/help4.mp4";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { GoInfo } from "react-icons/go";

const contentStyle = {
  height: "800px",
  width: "700px",
  border: "1px solid black",

  backgroundColor: "rgba(100, 100, 100, 0.8)",
};

const video = (src) => {
  return (
    <div className={styles.videoContainer}>
      <video loop width="700px" autoPlay src={src} type="video/mp4" />
    </div>
  );
};

const text = (content) => {
  return <div className={styles.textContainer}>{content}</div>;
};

const plusIcon = () => (
  <span className={styles.iconContainer}>
    <span className={styles.plusIconBg} />
    <IoMdAddCircle className={styles.plusIcon} />
  </span>
);

const minusIcon = () => (
  <span className={styles.iconContainer}>
    <span className={styles.minusIconBg} />
    <IoMdRemoveCircle className={styles.minusIcon} />
  </span>
);

const editIcon = () => (
  <span className={styles.iconContainer}>
    <FaRegEdit className={styles.editIcon} />
  </span>
);

const infoIcon = () => (
  <span className={styles.iconContainer}>
    <GoInfo className={styles.infoIcon} />
  </span>
);

const step1 = (
  <div>
    {video(help1)}
    {text(
      <span>
        You can view tasks for different service intervals by clicking the
        respective header.
      </span>
    )}
  </div>
);
const step2 = (
  <div>
    {video(help2)}
    {text(
      <span>
        Pressing &nbsp;{infoIcon()}&nbsp; brings up the Information Panel and
        provides more details on a particular task such as instructions, parts,
        and helpful links.
        <br />
        <br />
        When you complete a task by dragging it into the "Complete" column, you
        can provide additional information like cost and date of service. This
        will be added to the Information Panel.
      </span>
    )}
  </div>
);
const step3 = (
  <div>
    {video(help3)}
    {text(
      <span>
        Press &nbsp;{minusIcon()}&nbsp; to activate delete mode followed by
        clicking any tasks you want to remove from the list. Be sure to
        deactivate delete mode by pressing &nbsp;{minusIcon()}&nbsp; again when
        you are done.
        <br />
        <br />
        You can add custom tasks to the list by pressing &nbsp;{plusIcon()}
        &nbsp;. This will bring up a panel where you can type in the task name.
        You can then click &nbsp;{infoIcon()}&nbsp; to bring up the information
        panel and click &nbsp;{editIcon()}&nbsp; to add details to your task.
      </span>
    )}
  </div>
);
const step4 = (
  <div>
    {video(help4)}
    {text(
      <span>
        Press the arrow at the bottom to open the Options Panel. Here you can
        add or remove service intervals or update your current miles. When
        updating your current miles, additional service intervals will be
        created and prefilled with default tasks based on your input.
      </span>
    )}
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
