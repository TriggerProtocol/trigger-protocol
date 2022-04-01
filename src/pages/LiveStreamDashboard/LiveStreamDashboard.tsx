import React, { useEffect, useState } from "react";
import { StreamLayout } from "Components/StreamLayout";
import { useParams } from "react-router-dom";
import styles from "./live-stream-dashboard.module.scss";
import { copyTextToClipboard } from "utils";
import { getStreamData, toggleStreamRecord } from "configs/livepeer.config";
type streamdataType = {
  playbackId: string;
  streamKey: string;
  isActive: boolean;
  record: boolean;
  id: string;
};

export const LiveStreamDashboard = () => {
  const { id } = useParams();
  const [streamData, setStreamData] = useState<streamdataType>({
    record: false,
    isActive: false,
    playbackId: "",
    streamKey: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      getStreamData(id).then(({ data }) => {
        setStreamData(data);
        console.log(data);
        setLoading(false);
      });
    }
  }, []);
  useEffect(() => {
    let interval: any;
    if (id && !loading && !streamData.isActive) {
      interval = setInterval(() => {
        getStreamData(id).then(({ data }) => {
          if (data.isActive) {
            setStreamData(data);
          }
        });
      }, 10000);
    }
    return () => {
      clearInterval(interval);
    };
  });
  function handleRecordToggle() {
    toggleStreamRecord(streamData.id, !streamData.isActive).then((data) => {
      console.log(data);
      setStreamData({ ...streamData, record: !streamData.isActive });
    });
  }
  return loading ? (
    <div className="">loading</div>
  ) : (
    <StreamLayout streamer={true} streamData={streamData}>
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
              <p>{streamData?.streamKey}</p>
            </div>
            <button
              className="btn-sm"
              onClick={(e) => (e.currentTarget.value = "test")}
            >
              Copy
            </button>
          </div>
          <div className={styles.item}>
            <div className={styles.url}>
              <p>Playback URL: </p>
              <p>
                https://cdn.livepeer.com/hls/{streamData?.playbackId}/index.m3u8
              </p>
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
            onClick={() => handleRecordToggle()}
          >
            <input type="checkbox" checked={streamData.record === true} />
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
