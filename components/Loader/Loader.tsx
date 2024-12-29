import styles from "@/components/Loader/loader.module.scss"

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader} aria-live="polite" aria-busy="true">
            </div>
        </div>
     );
}
 
export default Loader;