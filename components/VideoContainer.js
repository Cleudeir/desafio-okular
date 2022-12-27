import React, { useRef } from "react";
import styles from "../styles/VideoContainer.module.css";
import useVideoPlayer from "../hooks/useVideoPlayer";
import VideoPlayerControls from "./VideoPlayerControls";

const VideoContainer = ({
  currentVideo,
  currentVideoChange,
  theater,
  deviceInfo,
  defaultWidth,
  setFullMode
}) => {
  const videoElement = useRef(null);
  const containerElement = useRef(null);
  const controlElement = useRef(null);
  const playerHook = useVideoPlayer({
    videoElement,
    controlElement,
    containerElement,
    currentVideoChange,
    deviceInfo,
    currentVideo,
    setFullMode
  });
  const { togglePlay, holdOpacityEnter, handleOnTimeUpdate } = playerHook;
  return (
    currentVideo && (
      <div
        className={styles.container}
        ref={containerElement}
        onMouseMove={holdOpacityEnter}
      >
        <video
          className={styles.video}
          src={currentVideo.url}
          poster={currentVideo.poster}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          onClick={() => {
            !deviceInfo.isPortrait ? togglePlay() : ''
          }}
        />
        <VideoPlayerControls
          currentVideoChange={currentVideoChange}
          playerHook={playerHook}
          controlElement={controlElement}
          defaultWidth={defaultWidth}
          theater={theater}
        />
      </div>
    )
  );
};

export default VideoContainer;
