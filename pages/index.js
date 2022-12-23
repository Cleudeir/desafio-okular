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
  }, [])

  return (
    deviceInfo && <div className={styles.main}>
      <VideoContainer deviceInfo={deviceInfo} setTheaterMode={setTheaterMode} />
    </div >
  );
};

export default App;