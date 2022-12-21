import React, { useRef } from 'react';
import styles from '/styles/Home.module.css'
import useVideoPlayer from "../hooks/useVideoPlayer";

const App = () => {
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElement);
  return (
    <div className={styles.container}>
      <div className={styles.video}>
        <video
          className={styles.video}
          src='/videos/001.mp4'
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
        />
        <div className={styles.controls}>
          <div className={styles.actions}>
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <i className={styles.bx}></i>
              ) : (
                <i className={styles.bx}></i>
              )}
            </button>
          </div>
          <input
            className={styles.input}
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <select
            className={styles.velocity}
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className={styles.mute} onClick={toggleMute}>
            {!playerState.isMuted ? (
              <i className={styles.bx}></i>
            ) : (
              <i className={styles.bx}></i>
            )
            }
          </button >
        </div >
      </div >
    </div >
  );
};

export default App;