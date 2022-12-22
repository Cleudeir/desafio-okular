import React from 'react';
import styles from '/styles/Home.module.css'
import VideoContainer from '../components/videoContainer';
import { useEffect } from 'react';

const App = () => {
  const [useDimensions, setDimensions] = React.useState(false)
  const [useTheaterMode, setTheaterMode] = React.useState(.8)
  useEffect(() => {
    let dimension = {
      height: window.innerHeight,
      width: window.innerWidth
    }
    console.log(dimension)
    setDimensions(dimension)
    addEventListener("resize", () => {
      dimension = {
        height: window.innerHeight,
        width: window.innerWidth
      }
      console.log(dimension)
      setDimensions(dimension)
    });
  }, [])

  return (
    <div className={styles.main}>
      {useDimensions && <VideoContainer setTheaterMode={setTheaterMode}
        style={{ width: useDimensions.width * useTheaterMode }} />}
    </div >
  );
};

export default App;