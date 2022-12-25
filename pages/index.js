import React from 'react';
import styles from '/styles/Home.module.css'
import VideoContainer from '../components/videoContainer';
import { useEffect } from 'react';

async function getData() {
  const request = await fetch('/api/videos')
  return await request.json()
}
const App = () => {
  const [dataVideos, setDataVideos] = React.useState(false)
  const [currentVideo, setCurrentVideo] = React.useState(false)
  const [deviceInfo, setDeviceInfo] = React.useState(false)
  const [defaultWidth] = React.useState(769)
  const [useTheaterMode, setTheaterMode] = React.useState(false)
  useEffect(() => {

    (async () => {
      const data = await getData()
      setDataVideos(data)
      setCurrentVideo(data[0])
    })()

    const dimension = {
      height: window.innerHeight,
      width: window.innerWidth,
      isPortrait: window.screen.width < window.screen.height
    }
    console.log(dimension)
    setDeviceInfo(dimension)

    if (window.innerWidth < defaultWidth) {
      setTheaterMode(true)
    }
    addEventListener("resize", (event) => {
      if (window.innerWidth < defaultWidth) {
        setTheaterMode(true)
      } else {
        setTheaterMode(false)
      }
    });
  }, [])

  function theater() {
    if (window.innerWidth > defaultWidth) {
      console.log(!useTheaterMode)
      setTheaterMode(!useTheaterMode)
    }
  }
  function currentVideoChange(e) {
    const index = dataVideos.findIndex(i => i.title === currentVideo.title)
    let calcIndex = index + e
    if (calcIndex < 0) {
      calcIndex = 0
    }
    if (calcIndex > dataVideos.length - 1) {
      calcIndex = dataVideos.length - 1
    }
    setCurrentVideo(dataVideos[calcIndex])
    console.log(index)
  }

  return (
    deviceInfo && dataVideos && <div className={styles.main}>
      <div className={styles.div1}> Header</div>
      <div className={useTheaterMode ? styles.div2_theater : styles.div2}>
        <VideoContainer
          currentVideoChange={currentVideoChange}
          currentVideo={currentVideo}
          deviceInfo={deviceInfo}
          theater={theater}
          defaultWidth={defaultWidth} />
      </div>
      <div className={useTheaterMode ? styles.div3_theater : styles.div3}> ListVideos</div>
      <div className={styles.div4}>coments </div>
      <div className={styles.div5}> footer</div>

    </div >
  );
};

export default App;