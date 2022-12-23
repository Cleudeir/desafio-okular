import React, { useRef } from 'react';
import styles from '../styles/VideoContainer.module.css'
import useVideoPlayer from "./hooks/useVideoPlayer";
import VideoPlayerControls from './VideoPlayerControls';

const VideoContainer = ({ theater, deviceInfo, defaultWidth }) => {
  const videoElement = useRef(null);
  const containerElement = useRef(null);
  const controlElement = useRef(null);
  const {
    handleOnTimeUpdate,
    holdOpacityEnter,
    playerState,
    togglePlay,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    handleVolume,
    toggleFullScreen
  } = useVideoPlayer(videoElement, controlElement, containerElement, deviceInfo);
  return (
    <div className={styles.container} ref={containerElement} onMouseMove={holdOpacityEnter}>
      <video
        className={styles.video}
        src='/videos/001.mp4'
        ref={videoElement}
        onClick={togglePlay}
        onTimeUpdate={handleOnTimeUpdate}
      />
      <VideoPlayerControls
        playerState={playerState}
        togglePlay={togglePlay}
        defaultWidth={defaultWidth}
        handleVideoProgress={handleVideoProgress}
        handleVideoSpeed={handleVideoSpeed}
        toggleMute={toggleMute}
        controlElement={controlElement}
        theater={theater}
        toggleFullScreen={toggleFullScreen}
        handleVolume={handleVolume} />
    </div >
  );
};

export default VideoContainer;