import React, { useEffect, useState } from "react";
import { StreamLayout } from "Components/StreamLayout";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./live-stream-dashboard.module.scss";
import { copyTextToClipboard } from "utils";
import { getStreamData, toggleStreamRecord } from "configs/livepeer.config";
import {
  deleteStreamInstance,
  getStreamInstanceId,
  IStreamData,
} from "configs/textile.io.configs";
type streamdataType = {
  playbackId: string;
  streamKey: string;
  isActive: boolean;
  record: boolean;
  id: string;
};

export const LiveStreamDashboard = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [livePeerData, setLivePeerData] = useState<streamdataType>({
    record: false,
    isActive: false,
    playbackId: "",
    streamKey: "",
    id: "",
  });
  const [streamData, setStreamData] = useState<IStreamData>({
    creatorAddress: "",
    _id: "",
    streamName: "",
    streamId: "",
    createdAt: "",
    portalId: "",
    appID: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getStreamInstanceId(id).then((data) => {
        let streamDataDb: IStreamData = data[0];
        getStreamData(streamDataDb.streamId).then(({ data }) => {
          setLivePeerData(data);
          setStreamData(streamDataDb);
          setLoading(false);
        });
      });
    }
  }, []);

  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      getStreamData(streamData.streamId)
        .then(({ data }) => {
          if (data.isActive) {
            console.log(data);
            setLivePeerData(data);
          } else {
            console.log("not active");
            setLivePeerData({ ...livePeerData, isActive: false });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [streamData]);
  // function handleRecordToggle() {
  //   toggleStreamRecord(streamData.id, !streamData.isActive).then((data) => {
  //     console.log(data);
  //     setStreamData({ ...streamData, record: !streamData.isActive });
  //   });
  // }
  function handleDeleteStream() {
    if (Boolean(streamData._id)) {
      deleteStreamInstance(streamData._id)
        .then((data) => {
          navigator("/portal/1");
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return loading ? (
    <div className="">loading</div>
  ) : (
    <StreamLayout streamer={true} streamData={livePeerData}>
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
            <button
              className="btn-sm"
              onClick={(e) => {
                e.currentTarget.innerHTML = "Copied";
                copyTextToClipboard("rtmp://rtmp.livepeer.com/live/");

                e.currentTarget.innerHTML = "Copy";
              }}
            >
              Copy
            </button>
          </div>
          <div className={styles.item}>
            <div className={styles.url}>
              <p>Stream Key: </p>
              <p>{livePeerData?.streamKey}</p>
            </div>
            <button
              className="btn-sm"
              onClick={(e) => {
                e.currentTarget.innerHTML = "Copied";
                copyTextToClipboard(livePeerData?.streamKey);
                e.currentTarget.innerHTML = "Copy";
              }}
            >
              Copy
            </button>
          </div>
          <div className={styles.item}>
            <div className={styles.url}>
              <p>Playback URL: </p>
              <p>
                https://cdn.livepeer.com/hls/{livePeerData?.playbackId}
                /index.m3u8
              </p>
            </div>
            <button
              className="btn-sm"
              onClick={(e) => {
                e.currentTarget.innerHTML = "Copied";
                copyTextToClipboard(` https://cdn.livepeer.com/hls/${livePeerData?.playbackId}
                /index.m3u8`);
                e.currentTarget.innerHTML = "Copy";

              }}
            >
              Copy
            </button>
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
            // onClick={() => handleRecordToggle()}
          >
            <input type="checkbox" checked={livePeerData.record === true} />
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
          <button className="btn-md" onClick={() => handleDeleteStream()}>
            End Stream
          </button>
        </div>
        <div className={styles.share}></div>
      </div>
    </StreamLayout>
  );
};
