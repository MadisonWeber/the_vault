import { useContext } from 'react'
import { GlobalState } from '../store/GlobalState'
import Link from 'next/link'
import styles from '../styles/nav.module.scss'

const Nav = () => {

    const { state } = useContext(GlobalState)
    const { user } = state

    return (
        <nav className = {styles.nav}>
            <Link href = '/'><h1>V</h1></Link>
            <ul>
                <Link href = "/products"><li>Products</li></Link>
                <Link href = "/about"><li>About</li></Link>
                <Link href = "/cart" ><li>Cart</li></Link>
                {user.name ?  <Link href = "/profile"><li>Profile</li></Link> : <Link href = "/signin"><li>Sign In</li></Link>}
            </ul>
        </nav>
    )
}

export default Nav
