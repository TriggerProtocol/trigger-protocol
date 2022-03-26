import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";

// styles
import styles from "./WalletButton.module.scss";

// assets
import avatar from "../../assets/images/avatar.png";

export const WalletButton = () => {
  const wallet_ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutisde = (event) => {
      if (wallet_ref.current && !wallet_ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutisde);
  }, []);

  return (
    <div
      className={styles.wallet_button}
      ref={wallet_ref}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div
        className={styles.wallet_state}
        style={showDropdown ? { paddingTop: "100px" } : { paddingTop: "0px" }}
      >
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar" />
        </div>{" "}
        <div className={styles.wallet_details_wrapper}>
          <div className={styles.wallet_details}>
            <h4>0xEhs67........Tk2zw</h4>
            <div className={styles.wallet_name}>
              <p>Metamask Wallet</p>
              <div className={styles.connected_or_not}></div>
            </div>
          </div>
          <Icon
            icon="gridicons:dropdown"
            fontSize={"23px"}
            id={styles.dropdown_icon}
          />
        </div>
      </div>
      {showDropdown ? (
        <div className={styles.dropdown}>
          <p>Copy Address</p>
          <p>Disconnect</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
