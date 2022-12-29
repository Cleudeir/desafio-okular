import { useEffect } from "react";
function useVideoPlayer({
  videoElement, controlElement, currentVideo, currentVideoChange, playerState, setPlayerState
}) {
  // Playing ------------------------------------------------------------------------------

  function togglePlay() {
    const status = {
      ...playerState,
      isPlaying: !playerState.isPlaying,
    };
    setPlayerState(status);
  }

  useEffect(() => {

    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();

    if (controlElement) {
      if (!playerState.isPlaying) {
        controlElement.current.style.opacity = 1;
      } else {
        holdOpacityEnter();
      }
    }
  }, [playerState.isPlaying]);

  // opacity ------------------------------------------------------------------------------

  let inUseHidden = false;
  let timeHidden;
  const holdOpacityEnter = () => {
    if (controlElement) {
      controlElement.current.style.opacity = 1;
      if (inUseHidden === true) {
        clearTimeout(timeHidden);
      }
      inUseHidden = true;
      timeHidden = setTimeout(() => {
        controlElement.current.style.opacity = 0;
        inUseHidden = false;
      }, 10000);
    }
  };

  // Muted --------------------------------------------------------------------------------

  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted]);

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };


  // Progress  ---------------------------------------------------------------------------

  function convertTime(value) {
    if (value === 0) {
      return "0:00";
    }
    let min = Math.floor(value / 60);
    if (!min || isNaN(min)) {
      min = "0";
    }
    let sec = Math.floor(value % 60 ? value % 60 : "00");
    if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ":" + sec;
  }

  const handleOnTimeUpdate = () => {
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    const currentTime = convertTime(videoElement.current.currentTime);
    const duration = convertTime(videoElement.current.duration);
    setPlayerState({
      ...playerState,
      progress,
      currentTime,
      duration,
    });
    if (videoElement.current.currentTime === videoElement.current.duration) {
      currentVideoChange(1);
    }
  };


  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime =
      (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  // speed  ---------------------------------------------------------------------------

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  useEffect(() => {
    const speed = playerState.speed;
    videoElement.current.playbackRate = speed;
  }, [playerState.speed]);

  // Volume  ---------------------------------------------------------------------------

  const handleVolume = (event) => {
    const volume = Number(event.target.value);
    videoElement.current.volume = volume / 100;
    setPlayerState({
      ...playerState,
      volume,
    });
  };

  // changeVideo  -------------------------------------------------------------------------

  useEffect(() => {
    const reset = {
      ...playerState,
      progress: 0,
      currentTime: convertTime(0),
      duration: convertTime(0),
    };
    setTimeout(() => {
      setPlayerState(reset);

      if (playerState.isPlaying) {
        videoElement.current.play()
      }
      videoElement.current.playbackRate = playerState.speed;

    }, 100);
  }, [currentVideo]);

  // FullScrenn -------------------------------------------------------------------------------

  function isFullScreen() {
    const isfull = document.fullScreen ||
      document.msFullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    return isfull
  }

  const toggleFullScreen = () => {
    if (isFullScreen()) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  };

  function exitFullScreen() {
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function enterFullScreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }

  // return --------------------------------------------------------------------------------------

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    holdOpacityEnter,
    handleVolume,
    toggleFullScreen,
  };
}
export default useVideoPlayer;
