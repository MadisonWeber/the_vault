import Layout from '../components/Layout'
import styles from '../styles/about.module.scss'
import axios from 'axios'

const about = () => {



    return (
        <Layout description = 'The Vault About Page'>
            <div className = {styles.about}>
                    <h2>ABOUT</h2>
                <div className = {styles.about__inner}>
                    <p className = {styles.about__text}>
                        The Vault is your one stop-shop for the hottest shoes on todays market.🔥
                    </p>
                    <p className = {styles.about__second__text}>If you want to be cool you have to shop here.</p>
                    <span>* This is not a real shop, you cannot actually buy anything. It is a mock project made by Madison Weber.</span>
                </div>
            </div>
        </Layout>

    )
}

export default about
