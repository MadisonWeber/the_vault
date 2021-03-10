import { useContext, useState } from 'react'
import { GlobalState } from "../store/GlobalState"
import ACTIONS from '../store/actions'
import styles from '../styles/profile.module.scss'
import Link from 'next/link'
import { useRouter }  from 'next/router'
import Cookie from 'js-cookie'

const Profile = () => {

    const { state, dispatch } = useContext(GlobalState)
    const { user } = state

    const [ profileOpen, setProfileOpen ] = useState(false)

    const router = useRouter()
    
    const handleLogout = () => {
        dispatch({ type : ACTIONS.LOGOUT})
        router.push('/products')
        localStorage.removeItem("USER_TOKEN")

        Cookie.remove('refreshToken')

        setTimeout(() => {
            dispatch({type : ACTIONS.CLEAR_MESSAGE})
        }, 2200)
    }

    return (
        <>
            <li className = {styles.profile} onClick = {()=> setProfileOpen(p => !p)}>
                    {user.email.toLowerCase()}
                    <i className="fas fa-caret-down" style = { profileOpen ? {transform: "rotate(180deg)"} : {transform: "rotate(0deg)"}}></i>
            </li>
            {
                profileOpen && 
                <div className = {styles.info}>
                    <p>Name : <span>{user.name}</span></p>
                    <p>Client Since : <span>{ new Date(user.createdAt).toLocaleDateString()}</span></p>
                    <Link href = {`/orders/orderhistory/${user._id}`}><button className = {styles.orders}>
                         See Order History
                    </button>
                    </Link>
                    <button onClick = {handleLogout} className = {styles.logout}>Logout</button>
                </div>
            }

        </>
    )
}

export default Profile
