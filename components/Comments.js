import styles from "../styles/Comments.module.css";

const Comments = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>{item.title}</h3>
      </div>
      <div className={styles.description}>
        <h4>{item.description}</h4>
      </div>
    </div>
  );
};

export default Comments;
