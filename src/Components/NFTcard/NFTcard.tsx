import React from "react";
import styles from "./NFTcard.module.scss";
import ProfileImg from "assets/images/ens-profile.png";
import NftThumbnail from "assets/images/nft-thumbnail.png";
export const NFTcard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.nft_owners}>
        <NftAddresses head="Created By" />
        <div className={styles.seperator}></div>
        <NftAddresses head="Owned By" />
      </div>
      <div className={styles.card_main}>
        <div className={styles.nft_thumbnail}>
          <img src={NftThumbnail} alt="" />
        </div>
        <div className={styles.card_buttons_wrapper}>
          <div className={styles.card_buttons}>
            <div className={styles.nft_info}>
              <div className={styles.data_wrap}>
                <div className={styles.data}>
                  <p className={styles.title}>Price</p>
                  <p className={styles.body}>100 TGR = $1000</p>
                </div>
                <div className={styles.data}>
                  <p className={styles.title}>Current Offer</p>
                  <p className={styles.body}>100 TGR = $1000</p>
                </div>
              </div>
              <div className={styles.button_wrap}>
                <button className="btn-sm">Buy Now</button>
                <button className="btn-sm">More info</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function NftAddresses({ head }: { head: String }) {
  return (
    <div className={styles.address_wrapper}>
      <div className={styles.profile}>
        <img src={ProfileImg} alt="" />
      </div>
      <div className={styles.address_info}>
        <p id={styles.heading}>{head}</p>
        <p id={styles.address}>0x680B..6d7</p>
      </div>
    </div>
  );
}
