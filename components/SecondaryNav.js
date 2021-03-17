import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from '../styles/secondarynav.module.scss'
import ACTIONS from '../store/actions'
import { useRouter }  from 'next/router'
import Cookie from 'js-cookie'

const SecondaryNav = ({menuOpen, setMenuOpen, user, dispatch, cart}) => {

    const secRef = useRef(null)
    const router = useRouter()


    const handleLogout = () => {
        dispatch({ type : ACTIONS.LOGOUT})
        router.push('/products')
        localStorage.removeItem("USER_TOKEN")

        localStorage.removeItem('VAULT_CART')
        Cookie.remove('refreshToken')
        setTimeout(() => {
            dispatch({type : ACTIONS.CLEAR_MESSAGE})
        }, 2200)
    }



    const handleClickAway = (e) => {
  
        if(secRef.current!== null && !e.path.includes(secRef.current)){
            setMenuOpen(false)
            window.removeEventListener('click', handleClickAway)
        }

    }

    // Close on ClickAway
    useEffect(()=> {
        if(!menuOpen) return 

        if(menuOpen)  window.addEventListener('click', handleClickAway)

        return ()=> window.removeEventListener('click', handleClickAway)

    }, [menuOpen])


    return (
        <div className = {menuOpen ? styles.hamburger__open : styles.hamburger__closed} ref = {secRef}>
            <h2 className = {styles.vault_ham_header}>The Vault</h2>
            <ul className = {styles.vault_ham_ul}>
                <Link href = "/products"><li>Products</li></Link>
                <Link href = "/about"><li>About</li></Link>
                <Link href = "/cart"><li>Cart ({cart.length})</li></Link>
                {user.name ? 
                (<>
                    <Link href = {`/orders/orderhistory/${user._id}`}><button className = {styles.order__history}>See Order History</button></Link>
                    <button onClick = {handleLogout} className = {styles.logout}>Logout</button>
                </>
                )
                : 
                <Link href = "/signin"><button className = {styles.signin}>Sign In</button></Link>
                }
            </ul>
            <i className = {['fas fa-times', styles.times].join(' ')} onClick = {() => setMenuOpen(p => !p)}></i>
        </div>
    )
}

export default SecondaryNav
