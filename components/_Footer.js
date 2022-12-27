import Link from "next/link";
import styles from "../styles/Footer.module.css";
import Image from "next/image";

function _Footer() {
  return (
    <div className={styles.container}>
      <h4>Copyright 2022</h4>
      <Link href="https://github.com/Cleudeir/desafio-okular">
        <Image
          width={30}
          height={30}
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="git"
          style={{ filter: "invert(1)", padding: "5px", zIndex: -1 }}
        />
      </Link>
      <Link href="https://github.com/Cleudeir/desafio-okular">
        <h4> by Cleudeir</h4>
      </Link>
    </div>
  )
}

export default _Footer;
