import React from "react";
import { StreamLayout } from "Components/StreamLayout";

import styles from "./live-stream-dashboard.module.scss";
export const LiveStreamDashboard = () => {
  return (
    <StreamLayout streamer={true}>
      <div className={styles.steam_connection_details}>
        <p className="heading2" id={styles.head}>
          Steam connection details
        </p>
        <div className={styles.detail}>
          <div className={styles.item}>
            <div className={styles.url}>
              <p>Ingest URL: </p>
              <p>rtmp://rtmp.livepeer.com/live/</p>
            </div>
            <button className="btn-sm">Copy</button>
          </div>
          <div className={styles.item}>
            <div className={styles.url}>
              <p>Stream Key: </p>
              <p>0e5b-9btr-gb4s-gooz</p>
            </div>
            <button className="btn-sm">Copy</button>
          </div>
          <div className={styles.item}>
            <div className={styles.url}>
              <p>Playback URL: </p>
              <p>https://cdn.livepeer.com/hls/0e5b9l73nusrz5nh/index.m3u8</p>
            </div>
            <button className="btn-sm">Copy</button>
          </div>
        </div>
      </div>
      <div className={styles.steam_settings}>
        <h2>Steam Settings</h2>
        <div className={styles.setting_item}>
          <p className="heading3">Record Stream</p>
          <label
            htmlFor=""
            className="switch-toggle"
            // onClick={() => setfundtoggle(!fundtoggle)}
          >
            <input type="checkbox" />
          </label>
        </div>{" "}
        <div className={styles.setting_item}>
          <p className="heading3">Allow Super chat</p>
          <label
            htmlFor=""
            className="switch-toggle"
            // onClick={() => setfundtoggle(!fundtoggle)}
          >
            <input type="checkbox" />
          </label>
        </div>
        <div className={styles.setting_item}>
          <button className="btn-md">End Stream</button>
        </div>
        <div className={styles.share}></div>
      </div>
    </StreamLayout>
  );
};
