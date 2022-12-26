import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <h4>Copyright 2022</h4>
      <Link href="https://github.com/Cleudeir" passHref>
        <img
          width={30}
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="git"
          style={{ filter: "invert(1)", padding: "5px" }}
        />
      </Link>
      <Link href="https://github.com/Cleudeir" passHref>
        <h4> by Cleudeir</h4>
      </Link>
    </div>
  );
};

export default Footer;
