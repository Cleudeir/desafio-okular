import React from "react";
import styles from "../styles/VideoPlayerControls.module.css";
import Image from "next/image";
const VideoPlayerControls = ({
  playerHook,
  theater,
  defaultWidth,
  controlElement,
  currentVideoChange,
  isFullScreen
}) => {
  const {
    playerState,
    togglePlay,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    handleVolume,
    toggleFullScreen,
    holdOpacityEnter,
  } = playerHook;

  return (
    <div className={styles.container} ref={controlElement}>
      <div className={styles.progress}>
        <input
          type="range"
          min="0"
          max="100"
          value={String(playerState.progress)}
          onChange={(e) => handleVideoProgress(e)}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.play}>
          <button className={styles.icons} onClick={togglePlay}>
            {playerState.isPlaying ? (
              <Image width={30} height={30} src="/icons/pause.png" alt="pause" />
            ) : (
              <Image width={30} height={30} src="/icons/play.png" alt="play" />
            )}
          </button>
        </div>
        <div className={styles.changeVideo}>
          <button
            className={styles.icons}
            onClick={() => {
              holdOpacityEnter(), currentVideoChange(-1);
            }}
          >
            <Image width={30} height={30} src="/icons/befor.png" alt="befor" />
          </button>
          <button
            className={styles.icons}
            onClick={() => {
              holdOpacityEnter();
              currentVideoChange(1);
            }}
          >
            <Image width={30} height={30} src="/icons/next.png" alt="next" />
          </button>
        </div>
        <div className={styles.times}>
          <h5>
            {playerState.currentTime} / {playerState.duration}
          </h5>
        </div>

        <div className={styles.velocity}>
          <Image width={30} height={30} src="/icons/playRate.png" alt="volume" />
          <select
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.25">x0.25</option>
            <option value="0.50">x0.50</option>
            <option value="0.75">x0.75</option>
            <option value="1">x1.00</option>
            <option value="1.25">x1.25</option>
            <option value="1.50">x1.50</option>
            <option value="1.75">x1.75</option>
            <option value="2">x2.00</option>
          </select>
        </div>
        <div className={styles.volume}>
          <button className={styles.icons} onClick={toggleMute}>
            {!playerState.isMuted ? (
              <Image width={30} height={30} src="/icons/volume.png" alt="volume" />
            ) : (
              <Image width={30} height={30} src="/icons/mute.png" alt="volume" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.volume}
            onChange={(e) => handleVolume(e)}
          />
        </div>
        {window.innerWidth > defaultWidth && !isFullScreen && (
          <div className={styles.theater}>
            <button className={styles.icons} onClick={theater}>
              <Image width={30} height={30} src="/icons/theater.png" alt="theater" />
            </button>
          </div>
        )}
        <div className={styles.fullScreen}>
          <button className={styles.icons} onClick={toggleFullScreen}>
            <Image width={30} height={30} src="/icons/fullscreen.png" alt="fullscreen" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerControls;
