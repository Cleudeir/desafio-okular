import React from "react";
import styles from "/styles/Home.module.css";
import { useEffect, useState } from "react";
import VideoContainer from "../components/VideoContainer";
import ListBarVideo from "../components/ListBarVideo";
import Comments from "../components/Comments";
import Header from "../components/Header";
import _Footer from '../components/_Footer';

async function getData() {
  try {
    const request = await fetch("/api/videos");
    return await request.json();
  } catch (error) {
    console.log(error)
  }
}
const App = () => {
  const [dataVideos, setDataVideos] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(false);
  const [defaultWidth] = useState(769);
  const [isTheaterMode, setIsTheaterMode] = useState(false)
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    volume: 100,
    progress: 0,
    currentTime: "0:00",
    duration: "0:00",
    speed: 1,
    isMuted: false,
    fullScreen: false,
  });

  useEffect(() => {
    (async () => {
      const data = await getData();
      setDataVideos(data);
      setCurrentVideo(data[0]);
    })();
  }, []);

  useEffect(() => {
    const dimension = {
      height: window.innerHeight,
      width: window.innerWidth,
      isPortrait: window.screen.width < window.screen.height,
    };
    setDeviceInfo(dimension);

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
  }, [defaultWidth]);

  function theater() {
    if (window.innerWidth > defaultWidth) {
      setIsTheaterMode(!isTheaterMode);
    }
  }

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

  return (
    dataVideos &&
    deviceInfo &&
    currentVideo && (
      <div className={styles.main}>
        <div className={!playerState.fullScreen ? styles.Header : styles.Header_fullScreen}>
          <Header />
        </div>
        <div className={!isTheaterMode ? styles.video : styles.video_theater}>
          <VideoContainer
            playerState={playerState}
            setPlayerState={setPlayerState}
            currentVideoChange={currentVideoChange}
            currentVideo={currentVideo}
            deviceInfo={deviceInfo}
            theater={theater}
            defaultWidth={defaultWidth}
          />
        </div>
        <div className={
          !playerState.fullScreen ? (!isTheaterMode ? styles.div3 : styles.div3_theater) : styles.div3_fullScreen}>
          <ListBarVideo
            dataVideos={dataVideos}
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          />
        </div>
        <div className={!playerState.fullScreen ? styles.div4 : styles.div4_fullScreen}>
          <Comments item={currentVideo} />
        </div>
        <div className={!playerState.fullScreen ? styles.div5 : styles.div5_fullScreen}>
          <_Footer />
        </div>
      </div >
    )
  );
};

export default App;
