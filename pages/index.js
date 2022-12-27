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
    return {
      id: 0,
      title: "Foster The People - Pumped Up Kicks (Official Video)",
      url: "/videos/001.mp4",
      poster: "/poster/001.jpg",
      description: "912,411,209 views  Feb 5, 2011",
    },
    {
      id: 1,
      title: "Axel Thesleff - Bad Karma",
      url: "/videos/002.mp4",
      poster: "/poster/002.jpg",
      description: "112,838,690 views  Jan 13, 2017",
    },
    {
      id: 2,
      title: "Aaron Smith - Dancin (KRONO Remix)",
      url: "/videos/003.mp4",
      poster: "/poster/003.jpg",
      description: "671,643,307 views  Apr 15, 2013",
    },
    {
      id: 3,
      title: "Tom Odell - Another Love (Lyrics) [Zwette Edit]",
      url: "/videos/004.mp4",
      poster: "/poster/004.jpg",
      description: "2,972,042 views  May 16, 2021",
    },
    {
      id: 4,
      title: "Capital Cities - Safe And Sound (Official Video)",
      url: "/videos/005.mp4",
      poster: "/poster/005.jpg",
      description: "676,941,301 views  Apr 25, 2013",
    }
  }
}
const App = () => {
  const [dataVideos, setDataVideos] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(false);
  const [defaultWidth] = useState(769);
  const [useTheaterMode, setTheaterMode] = useState(false)
  const [useFullMode, setFullMode] = useState(false);

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
  }, [defaultWidth]);

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
        <div className={!useFullMode ? styles.Header : styles.Header_fullScreen}>
          <Header />
        </div>
        <div className={!useTheaterMode ? styles.video : styles.video_theater}>
          <VideoContainer
            currentVideoChange={currentVideoChange}
            currentVideo={currentVideo}
            deviceInfo={deviceInfo}
            theater={theater}
            defaultWidth={defaultWidth}
            setFullMode={setFullMode}
          />
        </div>
        <div className={
          !useFullMode ? (!useTheaterMode ? styles.div3 : styles.div3_theater) : styles.div3_fullScreen}>
          <ListBarVideo
            dataVideos={dataVideos}
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          />
        </div>
        <div className={!useFullMode ? styles.div4 : styles.div4_fullScreen}>
          <Comments item={currentVideo} />
        </div>
        <div className={!useFullMode ? styles.div5 : styles.div5_fullScreen}>
          <_Footer />
        </div>
      </div >
    )
  );
};

export default App;
