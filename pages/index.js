import React from "react";
import styles from "/styles/Index.module.css";
import VideoContainer from "../components/VideoContainer";
import ListBarVideo from "../components/ListBarVideo";
import Comments from "../components/Comments";
import Header from "../components/Header";
import _Footer from '../components/_Footer';
import useIndex from '../hooks/useIndex';

const App = () => {

  const {
    isPortrait,
    isFullScreen,
    dataVideos,
    currentVideo,
    isTheaterMode,
    defaultWidth,
    playerState,
    theater,
    setPlayerState,
    setCurrentVideo,
    currentVideoChange,
  } = useIndex()


  return (
    playerState &&
    dataVideos && (
      <div className={!isFullScreen ?
        !isTheaterMode ? styles.main : styles.main_theater :
        !isPortrait ? styles.main_fullScreen : styles.main_fullScreenPortrait}>
        <div className={!isFullScreen ? styles.Header : styles.Header_fullScreen}>
          <Header />
        </div>
        <div className={!isFullScreen ?
          !isTheaterMode ? styles.video : styles.video_theater :
          !isPortrait ? styles.video_fullScreen : styles.video_fullScreenPortrait}>
          <VideoContainer
            playerState={playerState}
            setPlayerState={setPlayerState}
            currentVideoChange={currentVideoChange}
            currentVideo={currentVideo}
            theater={theater}
            defaultWidth={defaultWidth}
            isFullScreen={isFullScreen}
          />
        </div>
        <div className={
          !isFullScreen ? (!isTheaterMode ? styles.listVideo : styles.listVideo_theater) : styles.listVideo_fullScreen}>
          <ListBarVideo
            dataVideos={dataVideos}
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          />
        </div>
        <div className={!isFullScreen ? styles.comments : styles.comments_fullScreen}>
          <Comments item={currentVideo} />
        </div>
        <div className={!isFullScreen ? styles.footer : styles.footer_fullScreen}>
          <_Footer />
        </div>
      </div >
    )
  );
};

export default App;
