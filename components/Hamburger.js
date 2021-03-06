import styles from '../styles/hamburger.module.scss'
import { useState, useContext } from 'react'
import { GlobalState } from "../store/GlobalState"
import SecondaryNav from '../components/SecondaryNav'

const Hamburger = () => {

    const [ menuOpen, setMenuOpen ] = useState(false)
    const { state, dispatch } = useContext(GlobalState)
    const { user, cart} = state


    return (
        <>
            <div className = {styles.hamburger} onClick = {() => setMenuOpen(p => !p)}>
                <div className = {styles.menu}></div>
            </div>
            {
                <SecondaryNav menuOpen = {menuOpen} setMenuOpen = {setMenuOpen} user = {user} dispatch = {dispatch} cart = {cart} />
            }
        </>
    )
}

export default Hamburger
