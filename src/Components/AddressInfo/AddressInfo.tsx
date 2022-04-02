import React, { useEffect } from "react";
import ProfileImg from "assets/images/ens-profile.png";
import styles from "./addressinfo.module.scss";
import { stripAddr } from "utils";
export const AddressInfo = ({
  address,
  text,
}: {
  address: string;
  text?: string;
}) => {
  useEffect(() => {});
  return (
    <div className={styles.container}>
      <img src={ProfileImg} alt="" />
      <div className={styles.flex_wrapper}>
        <p id={styles.address}>{stripAddr(address)}</p>
        {text ? <p id={styles.amount}>{text}</p> : null}
      </div>
    </div>
  );
};
