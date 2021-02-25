import Layout from '../components/Layout'
import { useContext, useState } from 'react'
import { GlobalState } from "../store/GlobalState"
import ACTIONS from '../store/actions'
import Link from 'next/link'
import LoaderTwo from '../components/LoaderTwo'
import axios from 'axios';
import { useRouter } from 'next/router'
import styles from '../styles/signin.module.scss'
import { validateRegister } from "../utils/validate"

const Register = () => {

    const { dispatch} = useContext(GlobalState)
    const router = useRouter()

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ cf_password, setCf_password] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        let errorMsg = validateRegister(name, email, password, cf_password)
        if(errorMsg){
            setLoading(false)
            return dispatch({ type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'error', text : errorMsg}})
        }  
        try {
            const { data } = await axios.post("http://localhost:3000/api/auth/register", {   
                name,
                email, 
                password,
                cf_password 
            })
            setLoading(false)
            
            dispatch({type : ACTIONS.REGISTER, payload : { user : data.user, message : {text : data.msg, category : 'success' }}})
            setTimeout(() => {
                dispatch({type : ACTIONS.CLEAR_MESSAGE})
                router.push('/products')
            }, 4000)


        } catch (error) {
            dispatch({ type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'error', text : error.response.data.msg}})
            setLoading(false)
        }

    }

    return (
       <Layout description = {'Register for The Vault'}>
           <div className = {styles.signin}>
               <form className = {styles.auth__form} onSubmit = {handleRegister}>
                    <h3>Register</h3>
                    <label htmlFor="name">Enter UserName</label>
                    <input type="text" placeholder = 'Name' value = {name} onChange = {(e) => setName(e.currentTarget.value)}/>
                    <label htmlFor="email">Enter Email</label>
                    <input type="text" placeholder = 'Email' value = {email} onChange = {(e) => setEmail(e.currentTarget.value)}/>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" autoComplete="on" placeholder = 'Password' value = {password} onChange = {(e) => setPassword(e.currentTarget.value)}/>
                    <label htmlFor="cf_password">Confirm Your Password</label>
                    <input type="password" autoComplete="on" placeholder = 'Confirm password' value = {cf_password} onChange = {(e) => setCf_password(e.currentTarget.value)}/>
                    <p>Already Have An Accout? <Link href = '/signin'>Signin</Link></p>
                    <button className = {styles.submit__form}> {loading ? <LoaderTwo /> :"Submit"}</button>
               </form>
           
           </div>

       </Layout>
    )
}

export default Register