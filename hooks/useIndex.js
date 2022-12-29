import { useEffect, useState } from "react";

async function getData() {
    try {
        const request = await fetch("/api/videos");
        return await request.json();
    } catch (error) {
        console.log(error)
    }
}


function useIndex({ playerState, setPlayerState }) {

    const [dataVideos, setDataVideos] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(false);
    const [defaultWidth] = useState(769);
    const [isPortrait, setIsPortrait] = useState(false)
    const [isTheaterMode, setIsTheaterMode] = useState(false)


    // Video list | VideoState --------------------------------------------------------------------------------------

    useEffect(() => {
        (async () => {
            const data = await getData();
            setDataVideos(data);
            setCurrentVideo(data[1]);
            console.log(window.screen.width, window.screen.height)
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

    // return --------------------------------------------------------------------------------------
    return { playerState, dataVideos, isPortrait, currentVideo, currentVideoChange, setCurrentVideo, isTheaterMode, setPlayerState, theater, defaultWidth };
}
export default useIndex;
