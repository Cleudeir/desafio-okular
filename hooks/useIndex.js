import { useEffect, useState } from "react";

async function getData() {
    try {
        const request = await fetch("/api/videos");
        const { result, videos } = await request.json();
        console.log({ result, videos })
        return result
    } catch (error) {
        console.log(error)
    }
}


function useIndex() {

    const [dataVideos, setDataVideos] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(false);
    const [defaultWidth] = useState(769);
    const [isPortrait, setIsPortrait] = useState(false)
    const [isTheaterMode, setIsTheaterMode] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)

    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        volume: 100,
        progress: 0,
        currentTime: "0:00",
        duration: "0:00",
        speed: 1,
        isMuted: false,
    });

    // Video list | VideoState --------------------------------------------------------------------------------------

    useEffect(() => {
        (async () => {
            const data = await getData();
            setDataVideos(data);
            setCurrentVideo(data[Math.ceil(data.length / 3)]);
            if (window.screen.width < window.screen.height) {
                setIsPortrait(true)
            }
        })();
    }, []);

    // currentVideo --------------------------------------------------------------------------------------

    function currentVideoChange(e) {
        const index = dataVideos.findIndex((i) => i.title === currentVideo.title);
        let calcIndex = index + e;
        if (calcIndex < 0) {
            calcIndex = 0;
        }
        if (calcIndex > dataVideos.length - 1) {
            calcIndex = dataVideos.length - 1;
        }
        setCurrentVideo(dataVideos[calcIndex]);
    }
    // dimension | theater--------------------------------------------------------------------------------------

    useEffect(() => {
        if (window.innerWidth < defaultWidth) {
            setIsTheaterMode(true);
        }
        addEventListener("resize", () => {
            if (window.innerWidth < defaultWidth) {
                setIsTheaterMode(true);
            } else {
                setIsTheaterMode(false);
            }
        });
    }, []);

    // theater --------------------------------------------------------------------------------------

    function theater() {
        if (window.innerWidth > defaultWidth) {
            setIsTheaterMode(!isTheaterMode);
        }
    }

    // fullscreen --------------------------------------------------------------------------------------
    let count = 0
    useEffect(() => {
        if (count === 0) {
            addEventListener('fullscreenchange', () => {
                const isfull = document.fullScreen ||
                    document.msFullScreen ||
                    document.mozFullScreen ||
                    document.webkitIsFullScreen;
                setIsFullScreen(isfull)
            }
            )
        }
        count += 1
    }, [])

    // return --------------------------------------------------------------------------------------
    return { playerState, setPlayerState, dataVideos, isPortrait, currentVideo, currentVideoChange, setCurrentVideo, isTheaterMode, theater, isFullScreen, defaultWidth };
}
export default useIndex;
