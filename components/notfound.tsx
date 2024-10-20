import styles from "../styles/write.module.css";

const NotFound = () => {
    return (
        <div className={styles.fullPage}>
            <div className={styles.notFoundPage}>
                <span className={styles.notFoundText}>404 | This page was not found</span>
            </div>
        </div>
    )
}

export default NotFound