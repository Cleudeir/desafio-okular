import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            width={40}
            height={40}
            src="/icons/tube.png" alt="git" />
        </Link>
        <h4>DESAFIO</h4>
      </div>
      <ol className={styles.menu}>
        <li>Home</li>
        <li>About</li>
      </ol>
    </div>
  );
};

export default Header;
