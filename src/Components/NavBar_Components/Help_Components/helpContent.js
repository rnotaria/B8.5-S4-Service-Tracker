import React from "react";
import styles from "./_HelpStyles.module.css";
import help1 from "./help_videos/help1.mp4";
import help2 from "./help_videos/help2.mp4";
import help3 from "./help_videos/help3.mp4";
import help4 from "./help_videos/help4.mp4";
import help5 from "./help_videos/help5.mp4";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { FaChevronUp, FaRegEdit, FaRegSave } from "react-icons/fa";
import { GoInfo } from "react-icons/go";

const video = (src) => {
  return (
    <div className={styles.videoContainer}>
      <video loop autoPlay src={src} type="video/mp4" />
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

const minusIconActive = () => (
  <span className={styles.iconContainer}>
    <span className={styles.minusIconActiveBg} />
    <IoMdRemoveCircle className={styles.minusIconActive} />
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

const saveIcon = () => (
  <span className={styles.iconContainer}>
    <FaRegSave className={styles.saveIcon} />
  </span>
);

const arrowIcon = () => (
  <span className={styles.iconContainer}>
    <FaChevronUp className={styles.arrowIcon} />
  </span>
);

const step1 = (
  <div>
    {video(help1)}
    {text(
      <span>
        Your upcoming service interval will be highlighted and open by default.
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
        provides more details on a particular task such as instructions, where
        to purchase parts, and useful links.
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
        deactivate delete mode by pressing &nbsp;{minusIconActive()}&nbsp; again
        when you are done.
        <br />
        <br />
        You can add custom tasks to the list by pressing &nbsp;{plusIcon()}
        &nbsp;. This will bring up a panel where you can type in the task name.
        You can then click &nbsp;{infoIcon()}&nbsp; to bring up the information
        panel and click &nbsp;{editIcon()}&nbsp; to add details to your task.
        Press &nbsp;{editIcon()}&nbsp; again to save.
      </span>
    )}
  </div>
);
const step4 = (
  <div>
    {video(help4)}
    {text(
      <span>
        Press &nbsp;{arrowIcon()}&nbsp; at the bottom to open the Options Panel.
        Here you can add or remove service intervals or update your current
        miles. When updating your current miles, additional service intervals
        will be created and prefilled with default tasks based on your input.
      </span>
    )}
  </div>
);
const step5 = (
  <div>
    {video(help5)}
    {text(
      <span>
        Click &nbsp;{saveIcon()}&nbsp; in the navigation bar to save your data.
        The save icon will turn green when it has successfully saved.
      </span>
    )}
  </div>
);

export const helpContent = [step1, step2, step3, step4, step5];
