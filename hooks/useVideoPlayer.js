import { useState, useEffect } from "react";
const useVideoPlayer = ({
  videoElement,
  controlElement,
  containerElement,
  deviceInfo,
  currentVideo,
  currentVideoChange,
  setFullMode
}) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    volume: 100,
    progress: 0,
    currentTime: convertTime(0),
    duration: convertTime(0),
    speed: 1,
    isMuted: false,
    fullScreen: false,
  });

  // Playing --------------------------------------------------------------------------------------

  const togglePlay = () => {
    const status = {
      ...playerState,
      isPlaying: !playerState.isPlaying,
    };
    setPlayerState(status);
  };

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
  }, [playerState.isPlaying, videoElement]);

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
      }, 5000);
    }
  };

  // Muted --------------------------------------------------------------------------------

  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

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
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;
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
      if (playerState.isPlaying) videoElement.current.play();
      videoElement.current.playbackRate = reset.speed;
    }, 100);
  }, [currentVideo]);

  // FullScrenn --------------------------------------------------------------------------------------

  const toggleFullScreen = () => {

    fullScreenChange();
    const state = {
      ...playerState,
      fullScreen: !playerState.fullScreen,
    };
    console.log(state.isPlaying)
    setFullMode(state.fullScreen)
    setPlayerState(state);
  };

  let countEffect = 0;
  useEffect(() => {
    if (countEffect === 0) {
      countEffect += 1;
      addEventListener("fullscreenchange", (event) => {
        if (document.fullscreen === false) {
          if (countEffect === 1) {
            const state = {
              ...playerState,
              fullScreen: false,
            };
            setFullMode(state.fullScreen)
            setPlayerState(state);
            exitFullScreen();
          }
        }
      });
    }
  }, []);



  function enterfullScreenStylePortrait() {
    containerElement.current.style.position = "absolute";
    containerElement.current.style.transform = "rotate(90deg)";
    containerElement.current.style.transformOrigin = "bottom left";
    containerElement.current.style.padding = 0;
    containerElement.current.style.marginTop = "-100vw";
    containerElement.current.style.objectFit = "cover";
    containerElement.current.style.top = 0;
    containerElement.current.style.left = 0;
    containerElement.current.style.height = "100vw";
    containerElement.current.style.width = "100vh";
    containerElement.current.style.zIndex = "1";
    containerElement.current.style.overflo = 'hidden'
  }
  function enterfullScreenStyleWidth() {
    containerElement.current.style.position = "absolute";
    containerElement.current.style.top = 0;
    containerElement.current.style.left = 0;
    containerElement.current.style.height = "100vh";
    containerElement.current.style.width = "100vw";
    containerElement.current.style.zIndex = "1";
  }
  function exitfullScreenStyle() {
    containerElement.current.style.position = "relative";
    containerElement.current.style.transform = "rotate(0deg)";
    containerElement.current.style.padding = "0px";
    containerElement.current.style.margin = "0px";
    containerElement.current.style.objectFit = "cover";
    containerElement.current.style.height = "auto";
    containerElement.current.style.width = "100%";
  }
  function exitFullScreen() {
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      exitfullScreenStyle();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      exitfullScreenStyle();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      exitfullScreenStyle();
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

  function fullScreenChange() {
    if (document.documentElement) {
      if (playerState.fullScreen === false) {
        if (deviceInfo && deviceInfo.isPortrait) {
          enterfullScreenStylePortrait()
        } else {
          enterfullScreenStyleWidth()
        }
        enterFullScreen()
      } else {
        exitFullScreen();
      }
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
};
export default useVideoPlayer;
