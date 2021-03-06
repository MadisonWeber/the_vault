import { useContext, useState } from 'react'
import { GlobalState } from "../store/GlobalState"
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/signin.module.scss'
import axios from 'axios'
import LoaderTwo from '../components/LoaderTwo'
import ACTIONS from '../store/actions'
import { validateSignin } from '../utils/validate'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'


const SignIn = () => {

    const { dispatch } = useContext(GlobalState)

    const router = useRouter()


    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleSignIn = async (e) => {
        e.preventDefault()
        setLoading(true)
        let errorMsg = validateSignin( email, password )
        if(errorMsg){
            setLoading(false)
            return dispatch({ type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'error', text : errorMsg}})
        }  
        try {
            const { data } = await axios.post(`api/auth/signin`, {
                email, 
                password, 
            })
            setLoading(false)
            
            localStorage.setItem('USER_TOKEN', data.user.token)
            const inThreeHours = new Date(new Date().getTime() + 180 * 60 * 1000)
            Cookie.set('refreshToken', data.refresh, 
            {
                expires : inThreeHours, 
            }
            )

            dispatch({type : ACTIONS.SIGNIN, payload : { user : data.user, message : {text : data.msg, category : 'success' }}})
            setTimeout(() => {
                dispatch({type : ACTIONS.CLEAR_MESSAGE})
                router.push('/products')
            }, 3000)

        } catch (error) {
            console.log(error)
            dispatch({ type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'error', text : error.response.data.msg}})
            setLoading(false)
        }

    }

    return (
       <Layout description = {'Sign In to The Vault'}>
           <div className = {styles.signin}>
               <form className = {styles.auth__form} onSubmit = {handleSignIn}>
                    <h3>Sign in</h3>
                    <label htmlFor="email">Enter Email</label>
                    <input type="text" placeholder = 'Email' value = {email} onChange = {(e) => setEmail(e.currentTarget.value) }/>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" autoComplete="on" placeholder = 'Password' value = {password} onChange = {(e) => setPassword(e.currentTarget.value)}/>
                    <p>Need an Account? <Link href = '/register'>Register</Link></p>
                    <button className = {styles.submit__form}> {loading ? <LoaderTwo /> :"Submit"}</button>
               </form>
           
           </div>
       </Layout>
    )
}

export default SignIn
