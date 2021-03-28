import { useState, useContext } from 'react'
import { GlobalState } from '../store/GlobalState'
import ACTIONS from '../store/actions'
import emailSelf from '../utils/emailself'
import styles from '../styles/footer.module.scss'


const Footer = () => {

    const initialState = { email : '', message : ''}
    const [ footerForm, setFooterForm ] = useState(initialState)
    const { email, message} = footerForm
    const { dispatch } = useContext(GlobalState)

    const handleChange = (e) => {
        const { name, value } = e.currentTarget
        setFooterForm({ ...footerForm, [name] : value})
       
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        emailSelf({message : message, from_name : email})
        setFooterForm(initialState)
        dispatch({ type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'info', text : `Message sent`}})
        setTimeout(() => {
            dispatch({type : ACTIONS.CLEAR_MESSAGE})
        }, 2800)
    }

    return (
        <div className = {styles.footer}>
            <div className = {styles.img__container}>
            </div>
            <div className = {styles.info__container}>
               <form className = {styles.contact_me} onSubmit = {handleSubmit}>
                   <h5>Fill in to contact owner of this site</h5>
                   <small>We will respond via email</small>
                   <label htmlFor="contact__email">Email</label>
                   <input type="text" id = "contact__email" name = 'email' value = {email} onChange = {handleChange} autoComplete = "off"/>
                   <label htmlFor="contact__message">Message</label>
                   <textarea type="text" id = "contact__message" name = 'message' maxLength = "1000" value = {message} onChange = {handleChange} autoComplete = "off"></textarea>
                   <button disabled = {email.length <= 4 || message.length <= 4 }>Send Message</button>
               </form>
               <ul>
                   <li><a target="_blank" href="https://twitter.com"><i className = 'fab fa-twitter' /></a></li>
                   <li><a target="_blank" href= "https://www.facebook.com"><i className = 'fab fa-facebook'/></a></li>
                   <li><a target="_blank" href = "https://www.instagram.com/"><i className = 'fab fa-instagram'/></a></li>
               </ul>
            </div>
        </div>
    )
}

export default Footer
