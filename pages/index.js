import React from "react";
import styles from "/styles/Home.module.css";
import VideoContainer from "../components/VideoContainer";
import ListBarVideo from "../components/ListBarVideo";
import Comments from "../components/Comments";
import Header from "../components/Header";
import _Footer from '../components/_Footer';
import useIndex from '../hooks/useIndex';


const App = () => {

  const { playerState, dataVideos, deviceInfo, currentVideo, setCurrentVideo, currentVideoChange, isTheaterMode, setPlayerState, theater, defaultWidth } = useIndex()

  return (
    playerState &&
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
