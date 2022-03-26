import React from "react";

import portal from "assets/images/portal.svg";
import styles from "./portal.module.scss";

export const Portal = () => {
  return (
    <div className={styles.portal}>
      <img src={portal} alt="portal" />
      <div className={styles.glow1}></div>
      <div className={styles.glow2}></div>
    </div>
  );
};
