import styles from "../styles/CardVideo.module.css";

const CardVideo = ({ item, setCurrentVideo }) => {
  return (
    <div
      className={styles.container}
      onClick={() => {
        setCurrentVideo(item);
      }}
    >
      <div className={styles.tumblr}>
        <img src={item.poster} alt={item.title} />
      </div>
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
