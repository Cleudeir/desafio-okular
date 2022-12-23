import React from 'react';
import styles from '../styles/VideoPlayerControls.module.css'
const VideoPlayerControls = ({
  playerState,
  togglePlay,
  handleVideoProgress,
  handleVideoSpeed,
  toggleMute,
  handleVolume,
  controlElement }) => {

  return (
    <div className={styles.controls} ref={controlElement}>
      <div className={styles.actions}>
        <button className={styles.icons} onClick={togglePlay}>
          {playerState.isPlaying ?
            <img src="/icons/pause.png" alt="pause" />
            : <img src="/icons/play.png" alt="play" />}
        </button>
      </div>
      <input
        className={styles.progress}
        type="range"
        min="0"
        max="100"
        value={playerState.progress}
        onChange={(e) => handleVideoProgress(e)}
      />
      <div className={styles.velocity}>
        <h5>
          Velocidade:
        </h5>
        <select
          value={playerState.speed}
          onChange={(e) => handleVideoSpeed(e)}
        >
          <option value="0.25">0.25</option>
          <option value="0.50">0.50</option>
          <option value="0.75">0.75</option>
          <option value="1">Normal</option>
          <option value="1.25">1.25</option>
          <option value="1.50">1.25</option>
          <option value="1.75">1.25</option>
          <option value="2">2</option>
        </select>
      </div>
      <div className={styles.volume} >
        <button className={styles.icons} onClick={toggleMute}>
          {!playerState.isMuted ? (
            <img src="/icons/volume.png" alt="volume" />
          ) : (
            <img src="/icons/mute.png" alt="volume" />
          )
          }
        </button >
        <input
          type="range"
          min="0"
          max="100"
          value={playerState.volume}
          onChange={(e) => handleVolume(e)}
        />
      </div>

    </div >
  );
};

export default VideoPlayerControls;