import styles from "../styles/write.module.css";
import { VocabVaultLogo } from "./vocabvaultlogo";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const path = usePathname();
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <a href="/" className={styles.logoHolder}>
          <VocabVaultLogo />
        </a>
        <a href="/" className={styles.logoText}>
          VocabVault
        </a>
      </div>
      <div className={styles.navbarRight}>
        {path.endsWith("learn") ||
        path.endsWith("write") ||
        path.endsWith("flashcards") ? (
          <a href={path.substring(0, path.length-(path.endsWith("flashcards") ? 10 : 5))} className={styles.navbarCreate}>
            Return to set
          </a>
        ) : (
          ""
        )}
        <a href="/allsets" className={styles.navbarCreate}>
          All Sets
        </a>
        <a href="/create" className={styles.navbarCreate}>
          Create Set
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
