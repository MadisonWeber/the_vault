import Layout from '../components/Layout'
import styles from '../styles/hero.module.scss'
import Link from 'next/link'



export default function Home() {
  return (
    <Layout>
        <div className = {styles.hero}>
            <div className = {styles.feature__one}>
              <Link href = "/products"><button className = {styles.shop__btn}>Shop All Products 🔥</button></Link>
            </div>
            <div className = {styles.feature__two}>
              <button className = {styles.shop__btn}>Shop Nike 🔥</button>
            </div>
            <div className = {styles.secondary__one}>
              <button className = {styles.shop__btn}>Shop Vans 🔥</button>
            </div>
            <div className = {styles.secondary__two} >
              <button className = {styles.shop__btn}>Shop Training 🔥</button>
            </div>
            <div className = {styles.secondary__three}>
              <button className = {styles.shop__btn}>Shop Vintage 🔥</button>
            </div>
        </div>
    </Layout>
  )
}
