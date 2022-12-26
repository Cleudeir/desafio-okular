import React from "react";
import styles from "/styles/Home.module.css";
import VideoContainer from "../components/videoContainer";
import { useEffect, useState } from "react";
import ListBarVideo from "../components/ListBarVideo";
import Comments from "../components/comments";
import Footer from "../components/Footer";
import Header from "../components/Header";

async function getData() {
  try {
    const request = await fetch("/api/videos");
    return await request.json();
  } catch (error) {
    console.log(error);
  }
}
const App = () => {
  const [dataVideos, setDataVideos] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(false);
  const [defaultWidth] = useState(769);
  const [useTheaterMode, setTheaterMode] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setDataVideos(data);
      setCurrentVideo(data[0]);
    })();

    const dimension = {
      height: window.innerHeight,
      width: window.innerWidth,
      isPortrait: window.screen.width < window.screen.height,
    };
    setDeviceInfo(dimension);

    if (window.innerWidth < defaultWidth) {
      setTheaterMode(true);
    }
    addEventListener("resize", () => {
      if (window.innerWidth < defaultWidth) {
        setTheaterMode(true);
      } else {
        setTheaterMode(false);
      }
    });
  }, []);

  function theater() {
    if (window.innerWidth > defaultWidth) {
      setTheaterMode(!useTheaterMode);
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
        <div className={styles.div1}>
          <Header />
        </div>
        <div className={useTheaterMode ? styles.div2_theater : styles.div2}>
          <VideoContainer
            currentVideoChange={currentVideoChange}
            currentVideo={currentVideo}
            deviceInfo={deviceInfo}
            theater={theater}
            defaultWidth={defaultWidth}
          />
        </div>
        <div className={useTheaterMode ? styles.div3_theater : styles.div3}>
          <ListBarVideo
            dataVideos={dataVideos}
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          />
        </div>
        <div className={styles.div4}>
          <Comments item={currentVideo} />
        </div>
        <div className={styles.div5}>
          <Footer />
        </div>
      </div>
    )
  );
};

export default App;
