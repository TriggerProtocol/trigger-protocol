import React from "react";
import ProfileImg from "assets/images/ens-profile.png";
import styles from "./addressinfo.module.scss";
export const AddressInfo = ({
  address,
  text,
}: {
  address: String;
  text?: String;
}) => {
  return (
    <div className={styles.container}>
      <img src={ProfileImg} alt="" />
      <div className={styles.flex_wrapper}>
        <p id={styles.address}>{address}</p>
        {text ? <p id={styles.amount}>{text}</p> : null}
      </div>
    </div>
  );
};
