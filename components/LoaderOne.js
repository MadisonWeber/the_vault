import styles from '../styles/loaderone.module.scss'

const LoaderOne = () => {
    return (
        <div className={styles.lds__ring}><div></div><div></div><div></div><div></div></div>
    )
}

export default LoaderOne

