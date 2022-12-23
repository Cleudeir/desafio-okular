import React, { useRef } from 'react';
import styles from '../styles/VideoContainer.module.css'
import useVideoPlayer from "./hooks/useVideoPlayer";
import VideoPlayerControls from './VideoPlayerControls';

const VideoContainer = ({ setTheaterMode }) => {
  const videoElement = useRef(null);
  const controlElement = useRef(null);
  const {
    handleOnTimeUpdate,
    holdOpacityEnter,
    holdOpacityLeave,
    playerState,
    togglePlay,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    handleVolume
  } = useVideoPlayer(videoElement, controlElement);

  return (
    <div className={styles.container} onMouseEnter={holdOpacityEnter} onMouseLeave={holdOpacityLeave}>
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
        handleVideoProgress={handleVideoProgress}
        handleVideoSpeed={handleVideoSpeed}
        toggleMute={toggleMute}
        controlElement={controlElement}
        setTheaterMode={setTheaterMode}
        handleVolume={handleVolume} />
    </div >
  );
};

export default VideoContainer;