import { useContext } from 'react'
import { GlobalState } from '../store/GlobalState'
import styles from '../styles/carticon.module.scss'
import Link from 'next/link'

const CartIcon = () => {

    const { state } = useContext(GlobalState)
    const { cart } = state 

    return (
    <Link href = "/cart" >
        <li className = {styles.cart}>
            <>
                <svg height="38" viewBox="0 0 24 28" width="38" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="21" fill="none" r="2" stroke= {cart.length > 0 ? '#5fbaf7' : "#EEE"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <circle cx="20" cy="21" fill="none" r="2" stroke= {cart.length > 0 ? '#5fbaf7' : "#EEE"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path d="M5.67,6H23l-1.68,8.39a2,2,0,0,1-2,1.61H8.75a2,2,0,0,1-2-1.74L5.23,2.74A2,2,0,0,0,3.25,1H1" fill="none" stroke= {cart.length > 0 ? '#5fbaf7' : "#EEE"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </svg>
                {cart.length > 0 && <span>{cart.length}</span>}
            </>
        </li>
    </Link>
    )
}

export default CartIcon
