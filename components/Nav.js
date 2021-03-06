import { useContext, useState, useEffect } from 'react'
import { GlobalState } from "../store/GlobalState"
import Link from 'next/link'
import styles from '../styles/nav.module.scss'
import Profile from '../components/Profile'
import hamburger from '../components/Hamburger'
import Hamburger from '../components/Hamburger'
import CartIcon from '../components/CartIcon'


const breakPoint = 861

const Nav = () => {

    const { state } = useContext(GlobalState)
    const { user, cart } = state

    const [ hamburger, setHamburger ] = useState(false)

    const handleResize = () => {
        if(window.innerWidth < breakPoint) setHamburger(true)
        if(window.innerWidth > breakPoint) setHamburger(false)
    }

    useEffect(() => {
        if(window.innerWidth > breakPoint) setHamburger(false)
        if(window.innerWidth < breakPoint) setHamburger(true)
        
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return (
        <nav className = {styles.nav}>
            <Link href = '/'><h1>V</h1></Link>
            {
                hamburger ? 
                <Hamburger />
                :
                (
            <ul className = {styles.regular__ul}>
                <Link href = "/products"><li>Products</li></Link>
                <Link href = "/about"><li>About</li></Link>
                <CartIcon />
                {user.name ?  <Profile /> : <Link href = "/signin"><li>Sign In</li></Link>}
            </ul>
                )
            }
        </nav>
    )
}

export default Nav
