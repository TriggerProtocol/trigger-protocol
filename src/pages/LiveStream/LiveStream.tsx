import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

//components
import { StreamLayout } from "Components/StreamLayout";
import { AddressInfo } from "Components/AddressInfo";
//styles
import styles from "./live-stream.module.scss";
import { getStreamData } from "configs/livepeer.config";
import {
  getStreamInstance,
  getStreamInstanceId,
  IStreamData,
} from "configs/textile.io.configs";

type livepeerDataType = {
  playbackId: string;
  streamKey: string;
  isActive: boolean;
  record: boolean;
  id: string;
};

export const LiveStream: React.FC = () => {
  const { id } = useParams();
  const [livePeerData, setLivePeerData] = useState<livepeerDataType>({
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


  return loading ? (
    <div className="">loading</div>
  ) : (
    <StreamLayout streamData={livePeerData}>
      <div className={styles.stream_data}>
        <div className={styles.head}>
          <h2>{streamData?.streamName}</h2>
          <AddressInfo address={streamData.creatorAddress} />
        </div>
        <div className={styles.styles_info}>
          <h3>100k viewers</h3>
          <p>
            Stream started{" "}
            <ReactTimeAgo date={Number(streamData?.createdAt)} locale="en-US" />
          </p>
        </div>
      </div>
    </StreamLayout>
  );
};
