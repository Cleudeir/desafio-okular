import { useState, useEffect } from "react";
const useVideoPlayer = (videoElement, controlElement, containerElement, deviceInfo) => {
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        volume: 20,
        progress: 0,
        currentTime: null,
        durantion: null,
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

    function convertTime(value) {
        const min = Math.floor(value / 60)
        let sec = Math.floor((value % 60 ? value % 60 : '00'))
        if (sec < 10) {
            sec = "0" + sec
        }
        return min + ":" + sec
    }

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
        setPlayerState({
            ...playerState,
            fullScreen: !playerState.fullScreen,
        });
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
                    containerElement.current.style.width = '101vh'
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
        }
    };

    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        holdOpacityEnter,
        handleVolume,
        toggleFullScreen
    };
};
export default useVideoPlayer