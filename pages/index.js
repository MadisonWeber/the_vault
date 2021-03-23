import { useEffect } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/hero.module.scss'
import Link from 'next/link'



export default function Home() {

  useEffect(()=> {
    console.log(window)
  },[])


  return (
    <Layout>
        <div className = {styles.hero}>
            <div className = {styles.feature__one}>
              <Link href = "/products"><button className = {styles.shop__btn}>Shop All Products 🔥</button></Link>
            </div>
            <div className = {styles.feature__two}>
              <Link href = {{ pathname : "/products", query:  {search : 'Nike'}}}><button className = {styles.shop__btn}>Shop Nike 🔥</button></Link>
            </div>
            <div className = {styles.secondary__one}>
              <Link href = {{ pathname : "/products", query:  {search : 'Vans'}}}><button className = {styles.shop__btn}>Shop Vans 🔥</button></Link>
            </div>
            <div className = {styles.secondary__two} >
              <Link href = {{ pathname : "/products", query:  {search : 'New Balance'}}}><button className = {styles.shop__btn}>Shop New Balance 🔥</button></Link>
            </div>
            <div className = {styles.secondary__three}>
              <Link href = {{ pathname : "/products", query:  {search : 'Adidas'}}}><button className = {styles.shop__btn}>Shop Adidas 🔥</button></Link>
            </div>
        </div>
    </Layout>
  )
}
