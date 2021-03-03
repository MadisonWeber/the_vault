import { useContext } from 'react'
import { GlobalState } from '../store/GlobalState'
import ACTIONS from '../store/actions'
import styles from '../styles/toast.module.scss'

// 3 different toasts... one for error one for info and one for success

const Toast = () => {

    const { state, dispatch } = useContext(GlobalState)

    const { message } = state

    const closeToast = () => {
        dispatch({ type : ACTIONS.CLEAR_MESSAGE})
    }
 
    if(!message.category) return null

    if(message.category === "error"){
        return (
            <div className = { `${styles.toast} ${styles.error}`}>
                {message.text}     
                <i className= {`fas fa-times ${styles.times}`}  onClick = {closeToast}></i>       
            </div>
        )
    }

    if(message.category === 'success'){
        return(
            <div className = { `${styles.toast} ${styles.success}`}>
                {message.text}     
                <i className= {`fas fa-times ${styles.times}`} onClick = {closeToast}></i>       
            </div>
        )
    }

    
    return (
        <div className = {styles.toast}>
            {message.text}     
            <i className= {`fas fa-times ${styles.times}`} onClick = {closeToast}></i>       
        </div>
    )
}

export default Toast
