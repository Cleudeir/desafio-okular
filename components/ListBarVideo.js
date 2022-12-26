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
    setListVideo(
      dataVideos.filter((item) =>
        item.title.toUpperCase().includes(text.toUpperCase())
      )
    );
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
        {listVideo.map((item) => (
          <CardVideo
            key={item.title}
            setCurrentVideo={setCurrentVideo}
            item={item}
          />
        ))}
      </div>
    )
  );
};

export default ListBarVideo;
