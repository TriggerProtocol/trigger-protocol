import React, {
  Children,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "@iconify/react";
//styles
import styles from "./popup-modal.module.scss";
type IPopupModalProps = {
  modalTitle: string;
  width: string;
  height: string;
  toggleModal: boolean;
  setToggleModal: (state: boolean) => void;
};
export const PopupModal: React.FC<IPopupModalProps> = ({
  children,
  modalTitle,
  width,
  height,
  toggleModal,
  setToggleModal,
}) => {
  //   const [toggle, setToggle] = useState(false);
  // const popup_cont_ref = useRef<HTMLDivElement>(null);
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
      // ref={popup_cont_ref}
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
