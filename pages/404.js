import Link from 'next/link';
import styles from '../styles/fourohfour.module.scss'

const FourOhFour = () => {
    return (
        <div className = {styles.four}>
            <div>
                <p className = {styles.big}>404</p>
                <p>This Page Does Not Exist</p>
                <Link href = "/"><button className = {styles.home}>Go Back To HomePage</button></Link>
            </div>
        </div>
    )
}

export default FourOhFour
