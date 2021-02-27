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
        setTimeout(() => {
            dispatch({type : ACTIONS.CLEAR_MESSAGE})
        }, 2200)
    }

    return (
        <>
            <li className = {styles.profile}>
                    {user.email.toLowerCase()}
                    <i className="fas fa-caret-down" style = { profileOpen ? {transform: "rotate(180deg)"} : {transform: "rotate(0deg)"}} onClick = {()=> setProfileOpen(p => !p)}></i>
            </li>
            {
                profileOpen && 
                <div className = {styles.info}>
                    <p>Name : <span>{user.name}</span></p>
                    <p>Client Since : <span>{ new Date(user.createdAt).toLocaleDateString()}</span></p>
                    <Link href = '/'> See Order History</Link>
                    <button onClick = {handleLogout}>Logout</button>
                </div>
            }

        </>
    )
}

export default Profile
