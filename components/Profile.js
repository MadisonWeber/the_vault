import { useContext, useState } from 'react'
import { GlobalState } from "../store/GlobalState"
import ACTIONS from '../store/actions'
import styles from '../styles/profile.module.scss'
import Link from 'next/link'

const Profile = () => {

    const { state, dispatch } = useContext(GlobalState)
    const { user } = state

    const [ profileOpen, setProfileOpen ] = useState(false)
    
    const handleLogout = () => {
        dispatch({ type : ACTIONS.LOGOUT})

        localStorage.removeItem("USER_TOKEN")

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
                    <Link href = '/'><button className = {styles.orders}>See Order History</button></Link>
                    <button onClick = {handleLogout} className = {styles.logout}>Logout</button>
                </div>
            }

        </>
    )
}

export default Profile
