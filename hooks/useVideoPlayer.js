import { useState, useEffect } from "react";
const useVideoPlayer = (videoElement, controlElement, containerElement, deviceInfo) => {
    function convertTime(value) {
        if (value === 0) {
            return '0:00'
        }
        let min = Math.floor(value / 60)
        if (!min || isNaN(min)) {
            min = "0"
        }
        let sec = Math.floor((value % 60 ? value % 60 : '00'))
        if (sec < 10) {
            sec = "0" + sec
        }
        return min + ":" + sec
    }

    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        volume: 20,
        progress: 0,
        currentTime: convertTime(0),
        duration: convertTime(0),
        speed: 1,
        isMuted: false,
        fullScreen: false
    });

    const togglePlay = () => {
        const status = {
            ...playerState,
            isPlaying: !playerState.isPlaying,
        }
        setPlayerState(status);
    };

    useEffect(() => {
        playerState.isPlaying
            ? videoElement.current.play()
            : videoElement.current.pause();

        if (controlElement) {
            if (!playerState.isPlaying) {
                controlElement.current.style.opacity = 1
            } else {
                holdOpacityEnter()
            }
        }
    }, [playerState.isPlaying, videoElement]);


    let inUseHidden = false
    let timeHidden;
    const holdOpacityEnter = () => {
        if (controlElement) {
            controlElement.current.style.opacity = 1
            if (inUseHidden === true) { clearTimeout(timeHidden) }
            inUseHidden = true
            timeHidden = setTimeout(() => {
                controlElement.current.style.opacity = 0
                inUseHidden = false
            }, 5000)
        }
    };

    useEffect(() => {
        playerState.isMuted
            ? (videoElement.current.muted = true)
            : (videoElement.current.muted = false);
    }, [playerState.isMuted, videoElement]);



    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        const currentTime = convertTime(videoElement.current.currentTime)
        const duration = convertTime(videoElement.current.duration)
        setPlayerState({
            ...playerState,
            progress,
            currentTime,
            duration
        });
        if (videoElement.current.currentTime === videoElement.current.duration) {
            setPlayerState({
                ...playerState,
                isPlaying: false,
            });
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                containerElement.current.style.position = 'relative'
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
                containerElement.current.style.position = 'relative'
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
                containerElement.current.style.position = 'relative'
            }
        }
    };

    const handleVideoProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
        setPlayerState({
            ...playerState,
            progress: manualChange,
        });
    };

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

    const toggleMute = () => {
        setPlayerState({
            ...playerState,
            isMuted: !playerState.isMuted,
        });
    };

    const toggleFullScreen = () => {
        fullScreenStyle()
        console.log(document.fullscreen)
        const state = {
            ...playerState,
            fullScreen: !playerState.fullScreen,
        }
        setPlayerState(state);
    };

    let countEffect = 0

    useEffect(() => {
        if (countEffect === 0) {
            countEffect += 1
            addEventListener("fullscreenchange", (event) => {
                if (document.fullscreen === false) {
                    console.log(document.fullscreen, countEffect)
                    if (countEffect === 1) {
                        const state = {
                            ...playerState,
                            fullScreen: false,
                        }
                        setPlayerState(state);
                        exitFullScreen()
                    }
                }
            });
        }
    }, [])

    useEffect(() => {
        if (countEffect === 0) {
            addEventListener("fullscreenchange", (event) => {
                console.log(playerState)
            });
            countEffect += 1
        }
    }, [])

    function resetVideoInfos() {
        const reset = {
            ...playerState,
            progress: 0,
            currentTime: convertTime(0),
            duration: convertTime(0),
            isPlaying: false,
        }
        setTimeout(() => {
            setPlayerState(reset);
        }, 100)

    }

    function exitFullScreen() {
        function rotateScreen() {
            containerElement.current.style.position = 'relative'
            containerElement.current.style.transform = 'rotate(0deg)'
            containerElement.current.style.padding = '0px'
            containerElement.current.style.margin = '0px'
            containerElement.current.style.objectFit = 'cover'
            containerElement.current.style.height = 'auto'
            containerElement.current.style.width = '100%'
        }
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            rotateScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            rotateScreen()
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            rotateScreen()
        }
    }

    function fullScreenStyle() {
        if (document.documentElement) {
            if (playerState.fullScreen === false) {
                if (deviceInfo && deviceInfo.isPortrait) {
                    containerElement.current.style.position = 'absolute'
                    containerElement.current.style.transform = 'rotate(90deg)'
                    containerElement.current.style.transformOrigin = 'bottom left'
                    containerElement.current.style.padding = 0
                    containerElement.current.style.marginTop = '-100vw'
                    containerElement.current.style.objectFit = 'cover'
                    containerElement.current.style.top = 0
                    containerElement.current.style.left = 0
                    containerElement.current.style.height = '100vw'
                    containerElement.current.style.width = '100vh'
                } else {
                    containerElement.current.style.position = 'absolute'
                    containerElement.current.style.top = 0
                    containerElement.current.style.left = 0
                }

                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            }
            else {
                exitFullScreen()
            }
        }
    }



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
        resetVideoInfos
    };
};
export default useVideoPlayer