import { useState, useEffect } from "react";
const useVideoPlayer = (videoElement, controlElement, containerElement) => {
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        volume: 50,
        progress: 0,
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
                setTimeout(() => {
                    controlElement.current.style.opacity = 0
                }, 2000)
            }
        }
    }, [playerState.isPlaying, videoElement]);


    const holdOpacityEnter = () => {
        console.log('enter controlElement', controlElement)
        if (controlElement) {
            controlElement.current.style.opacity = 1
        }
    };

    const holdOpacityLeave = () => {
        console.log('out controlElement', controlElement, playerState)
        if (controlElement && playerState.isPlaying) {
            controlElement.current.style.opacity = 0
        }
    };


    useEffect(() => {
        playerState.isMuted
            ? (videoElement.current.muted = true)
            : (videoElement.current.muted = false);
    }, [playerState.isMuted, videoElement]);

    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        setPlayerState({
            ...playerState,
            progress,
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
        console.log(volume)
        videoElement.current.volume = volume / 100;
        setPlayerState({
            ...playerState,
            volume,
        });
    };

    const toggleMute = () => {
        console.log('click')
        setPlayerState({
            ...playerState,
            isMuted: !playerState.isMuted,
        });
    };
    const toggleFullScreen = () => {
        console.log('click full')
        setPlayerState({
            ...playerState,
            fullScreen: !playerState.fullScreen,
        });
        if (document.documentElement) {
            if (playerState.fullScreen === false) {
                containerElement.current.style.position = 'absolute'
                containerElement.current.style.top = 0
                containerElement.current.style.left = 0
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            }
            else {
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
        holdOpacityLeave,
        handleVolume,
        toggleFullScreen
    };
};
export default useVideoPlayer