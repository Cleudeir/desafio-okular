import React, { useRef } from "react";
import styles from "../styles/VideoContainer.module.css";
import useVideoPlayer from "../hooks/useVideoPlayer";
import VideoPlayerControls from "./VideoPlayerControls";

const VideoContainer = ({
  currentVideo,
  currentVideoChange,
  theater,
  defaultWidth,
  playerState,
  setPlayerState,
  isFullScreen
}) => {
  const videoElement = useRef(null);
  const controlElement = useRef(null);

  const playerHook = useVideoPlayer({
    playerState,
    setPlayerState,
    videoElement,
    controlElement,
    currentVideoChange,
    currentVideo,
  });
  const { togglePlay, holdOpacityEnter, handleOnTimeUpdate } = playerHook;

  return (
    currentVideo && (
      <div
        className={!isFullScreen ? styles.container : styles.container_fullScreen}
        onMouseMove={holdOpacityEnter}
      >
        <video
          className={styles.video}
          src={currentVideo.url}
          poster={currentVideo.poster}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          onClick={() => {
            window.screen.height < window.screen.width ? togglePlay() : ''
          }}
        />
        <VideoPlayerControls
          currentVideoChange={currentVideoChange}
          playerHook={playerHook}
          controlElement={controlElement}
          defaultWidth={defaultWidth}
          theater={theater}
          isFullScreen={isFullScreen}
        />
      </div>
    )
  );
};

export default VideoContainer;
