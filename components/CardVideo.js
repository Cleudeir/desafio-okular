import styles from "../styles/CardVideo.module.css";

const CardVideo = ({ item, setCurrentVideo }) => {
  return (
    <div
      className={styles.container}

      onClick={() => {
        setCurrentVideo(item);
        console.log('click')
        window.scrollTo(0, 0)
      }}
    >
      <div className={styles.tumblr}>
        <div style={
          {
            margin: 0,
            padding: 0,
            backgroundImage: `url(${item.poster})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} >
          <div
            style={{
              position: 'relative',
              margin: 0,
              padding: 0,
              width: '16em',
              maxHeight: 160,
              height: '8em',
            }}
          ></div>
        </div>

      </div >
      <div className={styles.title}>
        <h3>{item.title}</h3>
      </div>
      <div className={styles.description}>
        <h4>{item.description}</h4>
      </div>
    </div>
  );
};

export default CardVideo;
