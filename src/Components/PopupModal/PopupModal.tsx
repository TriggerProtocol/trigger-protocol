import React, { Children, ReactChild, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
//styles
import styles from "./popup-modal.module.scss";
interface IPopupModalProps {
  children: JSX.Element;
  modalTitle: String;
  width: String;
  height: String;
  toggleModal: Boolean;
  setToggleModal: (togle: Boolean) => {};
}
export const PopupModal = ({
  children,
  modalTitle,
  width,
  height,
  toggleModal,
  setToggleModal,
}: IPopupModalProps) => {
  //   const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (toggleModal) {
      window.document.getElementsByTagName("body")[0].style.overflowY =
        "hidden";
    } else {
      window.document.getElementsByTagName("body")[0].style.overflowY =
        "scroll";
    }
  }, [toggleModal]);
  return (
    <div
      className={styles.container}
      style={toggleModal ? { visibility: "visible" } : { visibility: "hidden" }}
    >
      <div className={styles.wrapper}>
        <div className={styles.overlay}></div>
        <div
          className={styles.main}
          style={{ width: `${width}`, height: `${height}` }}
        >
          <div className={styles.modal_head}>
            <h3>{modalTitle}</h3>
            <button onClick={() => setToggleModal(false)}>
              <Icon icon="ei:close" height="25" />
            </button>
          </div>
          <div className={styles.modal_body}>{children}</div>
        </div>
      </div>
    </div>
  );
};
