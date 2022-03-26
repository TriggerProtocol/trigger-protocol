import React from "react";
import { Icon } from "@iconify/react";

//components
import { NFTcard } from "Components/NFTcard";

//styles
import styles from "./Portalpage.module.scss";

export const PortalPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main_section}>
        <div className={`${styles.hot_nft} solid_border`}>
          <div className={styles.head}>
            <p className="heading1">Hot NFT</p>
            <Icon icon="noto:fire" height="30" />
          </div>
          <div className={styles.nft_card}>
            <NFTcard />
          </div>
        </div>
        <div className={`${styles.portal_details} solid_border`}></div>
        <div className={`${styles.portal_staking} solid_border`}></div>
        <div className={`${styles.portal_user_achievement} solid_border`}></div>
      </div>
    </div>
  );
};
