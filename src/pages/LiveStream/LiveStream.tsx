import React from "react";
import { StreamLayout } from "Components/StreamLayout";
import { AddressInfo } from "Components/AddressInfo";
//styles
import styles from "./live-stream.module.scss";
export const LiveStream: React.FC = () => {
  return (
    <StreamLayout >
      <div className={styles.stream_data}>
        <div className={styles.head}>
          <h2>BeyondTheSummit</h2>
          <AddressInfo address="shrey.eth" />
        </div>
        <div className={styles.styles_info}>
          <h3>100k viewers</h3>
          <p>Stream started 10 min ago</p>
        </div>
      </div>
    </StreamLayout>
  );
};
