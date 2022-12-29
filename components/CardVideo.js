import Image from "next/image";
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
        <Image
          width={854}
          height={480}
          src={item.poster} alt={item.title} />
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
