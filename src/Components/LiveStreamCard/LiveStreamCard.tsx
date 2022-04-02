import React from "react";
//components
//assets
import streamThumbnail from "assets/images/stream_thumbnail.png";
//styles
import styles from "./live-stream-card.module.scss";
import { AddressInfo } from "Components/AddressInfo";
type props = {
  streamName: string;
  creatorAddress: string;
  createdAt: string;
};
export const LiveStreamCard: React.FC<props> = ({
  streamName,
  creatorAddress,
  createdAt,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.stream_thumbnail}>
        <div className={styles.watch_now_bg}>
          <div className={styles.watch_now_button}>
            <button>Watch now</button>
          </div>
        </div>
        <img src={streamThumbnail} alt="" />
      </div>
      <div className={styles.streamdetails}>
        <div className={styles.stream_card_left}>
          <div className={styles.stream_title}>
            <h3>{streamName}</h3>
            <AddressInfo address={creatorAddress} />
          </div>
        </div>
        <div className={styles.viewers_count}>
          <p>100K viewers</p>
        </div>
      </div>
    </div>
  );
};
