import React, { useRef } from 'react';
import styles from '../styles/VideoContainer.module.css'
import useVideoPlayer from "../hooks/useVideoPlayer";
import VideoPlayerControls from './VideoPlayerControls';

const VideoContainer = ({ theater, deviceInfo, defaultWidth }) => {
  const videoElement = useRef(null);
  const containerElement = useRef(null);
  const controlElement = useRef(null);
  const playerHook = useVideoPlayer(videoElement, controlElement, containerElement, deviceInfo);
  const { holdOpacityEnter, handleOnTimeUpdate } = playerHook

  return (
    <div className={styles.container} ref={containerElement} onMouseMove={holdOpacityEnter}>
      <video
        className={styles.video}
        src='/videos/001.mp4'
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
      />
      <VideoPlayerControls
        playerHook={playerHook}
        controlElement={controlElement}
        defaultWidth={defaultWidth}
        theater={theater}
      />
    </div >
  );
};

export default VideoContainer;