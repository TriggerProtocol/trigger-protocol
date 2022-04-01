import React from "react";
import { Icon } from "@iconify/react";

//styles
import styles from "./live-stream-layout.module.scss";
type PropType = {
  streamer?: true;
};
export const StreamLayout: React.FC<PropType> = ({
  children,
  streamer,
}: any) => {
  const domain = encodeURIComponent("https://trigger.com");
  console.log(domain);
  const convoURL = `https://theconvo.space/embed/dt?threadId=KIGZUnR4RzXDFheXoOwo&theme=dark&height=700px`;
  return (
    <div className={styles.container}>
      <div className={styles.stream_video}>
        <video
          id="video"
          // ref={onVideo}
          className={styles.stream_video_player}
          controls
          playsInline
        />
        {streamer ? (
          <p id={styles.stream_note}>
            Note: To start a video stream, please use a broadcaster software
            like OBS/Streamyard on desktop, or Larix on mobile
          </p>
        ) : null}
        <div className={styles.stream_status}>
          <Icon icon="carbon:view-filled" height="20" />
          <p>Live</p>
        </div>
      </div>
      <div className={styles.stream_details}>{children}</div>
      <div className={styles.stream_chat}>
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
  );
};
