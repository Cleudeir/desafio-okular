import { useState, useEffect } from "react";
const useVideoPlayer = (videoElement, controlElement) => {
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        volume: 50,
        progress: 0,
        speed: 1,
        isMuted: false,
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
                }, 1000)
            }
        }
    }, [playerState.isPlaying, videoElement]);

    useEffect(() => {
        // console.log(playerState)
    }, [playerState]);

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

    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        holdOpacityEnter,
        holdOpacityLeave,
        handleVolume
    };
};
export default useVideoPlayer