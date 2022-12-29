import styles from "../styles/ListBarVideo.module.css";
import CardVideo from "./CardVideo";
import { useEffect } from "react";
import { useState } from "react";

const ListBarVideo = ({ dataVideos, currentVideo, setCurrentVideo }) => {
  const [listVideo, setListVideo] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    const list = dataVideos.filter((item) => item.title !== currentVideo.title);
    setListVideo(list);
  }, [currentVideo]);

  useEffect(() => {
    let list = dataVideos.filter((item) =>
      item.title.toUpperCase().includes(text.toUpperCase())
    )
    list = list.filter((item) => item.title !== currentVideo.title);
    setListVideo(list);
  }, [text]);

  return (
    dataVideos &&
    listVideo && (
      <div className={styles.container}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Busca"
        />
        <div className={styles.videos}>
          <div className={styles.rowVideos}>
            {listVideo.map((item) => (
              <CardVideo
                key={item.title + Math.random()}
                setCurrentVideo={setCurrentVideo}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ListBarVideo;
