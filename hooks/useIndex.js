import { useEffect, useState } from "react";

async function getData() {
    try {
        const request = await fetch("/api/videos");
        return await request.json();
    } catch (error) {
        console.log(error)
    }
}

function useIndex() {

    const [dataVideos, setDataVideos] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(false);
    const [defaultWidth] = useState(769);
    const [isTheaterMode, setIsTheaterMode] = useState(false)
    const [playerState, setPlayerState] = useState(false);

    // Video list | VideoState --------------------------------------------------------------------------------------

    useEffect(() => {
        (async () => {
            const data = await getData();
            setDataVideos(data);
            setCurrentVideo(data[0]);
            setPlayerState({
                isPlaying: false,
                volume: 100,
                progress: 0,
                currentTime: "0:00",
                duration: "0:00",
                speed: 1,
                isMuted: false,
                fullScreen: false,
            })
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

    // return --------------------------------------------------------------------------------------
    return { playerState, dataVideos, currentVideo, currentVideoChange, setCurrentVideo, isTheaterMode, setPlayerState, theater, defaultWidth };
}
export default useIndex;
