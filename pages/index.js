import React from 'react';
import styles from '/styles/Home.module.css'
import VideoContainer from '../components/videoContainer';
import { useEffect } from 'react';

const App = () => {
  const [deviceInfo, setDeviceInfo] = React.useState(false)
  const [useTheaterMode, setTheaterMode] = React.useState(false)
  useEffect(() => {
    const dimension = {
      height: window.innerHeight,
      width: window.innerWidth,
      isPortrait: window.screen.width < window.screen.height
    }
    console.log(dimension)
    setDeviceInfo(dimension)

    if (window.innerWidth < 769) {
      setTheaterMode(true)
    }
    addEventListener("resize", (event) => {
      if (window.innerWidth < 769) {
        setTheaterMode(true)
      } else {
        setTheaterMode(false)
      }
    });
  }, [])

  function theater() {
    if (window.innerWidth > 769) {
      console.log(!useTheaterMode)
      setTheaterMode(!useTheaterMode)
    }
  }
  return (
    deviceInfo && <div className={styles.main}>

      <div className={styles.div1}> Header</div>
      <div className={useTheaterMode ? styles.div2_theater : styles.div2}>
        <VideoContainer deviceInfo={deviceInfo} theater={theater} /></div>
      <div className={useTheaterMode ? styles.div3_theater : styles.div3}> ListVideos</div>
      <div className={styles.div4}>coments </div>
      <div className={styles.div5}> footer</div>

    </div >
  );
};

export default App;