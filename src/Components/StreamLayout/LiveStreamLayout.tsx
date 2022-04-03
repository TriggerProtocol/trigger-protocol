import React from "react";
import { Icon } from "@iconify/react";
import videojs from "video.js";
// import "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "video.js/dist/video-js.min.css";

import styles from "./live-stream-layout.module.scss";
type PropType = {
  streamer?: true;
  streamData?: Object;
};

export const StreamLayout: React.FC<PropType> = ({
  children,
  streamer,
  streamData,
}: any) => {
  const [videoEl, setVideoEl] = React.useState(null);
  const onVideo = React.useCallback((el) => {
    setVideoEl(el);
  }, []);

  React.useEffect(() => {
    console.log(streamData);
    if (videoEl == null) return;
    if (streamData.isActive && streamData.playbackId) {
      const player = videojs(videoEl, {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: `https://cdn.livepeer.com/hls/${streamData.playbackId}/index.m3u8`,
          },
        ],
      });
      console.log("setting player")
      // player.hlsQualitySelector();

      player.on("error", () => {
        player.src(
          `https://cdn.livepeer.com/hls/${streamData.playbackId}/index.m3u8`
        );
      });
    } 
  }, [streamData]);

  const domain = encodeURIComponent("https://trigger.com");
  console.log(domain);
  const convoURL = `https://theconvo.space/embed/dt?threadId=${streamData?.id}&theme=dark&height=700px`;

  return (
    <div className={styles.container}>
      <div className={styles.stream_video}>
        <video
          id="video"
          //@ts-ignore
          ref={onVideo}
          className={`${styles.stream_video_player} video-js vjs-theme-city`}
          controls
          playsInline
        />
        {streamer ? (
          <p id={styles.stream_note}>
            Note: To start a video stream, please use a broadcaster software
            like OBS/Streamyard on desktop, or Larix on mobile
          </p>
        ) : null}
        <div
          className={styles.stream_status}
          id={streamData.isActive ? styles.live : styles.waiting}
        >
          <Icon icon="carbon:view-filled" height="20" />
          <p>{streamData.isActive ? "Live" : "Waiting"}</p>
        </div>
      </div>
      <div className={styles.stream_details}>{children}</div>
      <div className={styles.stream_chat}>
        <div className={styles.chat_wrapper}>
          {" "}
          <h2>Live Chat</h2>
          <iframe
            title="Chat"
            src={convoURL}
            // allowTransparency={true}
            width={"100%"}
            height={"100%"}
            loading="eager"
          >
            chats
          </iframe>
        </div>
      </div>
    </div>
  );
};
