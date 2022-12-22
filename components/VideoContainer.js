import React, { useRef } from 'react';
import styles from '../styles/VideoContainer.module.css'
import useVideoPlayer from "./hooks/useVideoPlayer";
import VideoPlayerControls from './VideoPlayerControls';

const VideoContainer = ({ setTheaterMode }) => {
  const videoElement = useRef(null);

  const {
    handleOnTimeUpdate,
  } = useVideoPlayer(videoElement);

  return (
    <div className={styles.container}>
      <video
        className={styles.video}
        src='/videos/001.mp4'
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
      />
      <VideoPlayerControls setTheaterMode={setTheaterMode} videoElement={videoElement} />
    </div >
  );
};

export default VideoContainer;