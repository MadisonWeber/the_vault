import { createContext, useReducer, useEffect, useState } from 'react'
import reducer from './reducer'
import axios from 'axios'
import ACTIONS from './actions'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

export const GlobalState = createContext()

const GlobalStateProvider = ({children}) => {



    const initialState = { user : {}, message : { category : '', text : ''}, cart : []}
    const [ tokenCallback, setTokenCallback ] = useState(true)

    const [state, dispatch ] = useReducer(reducer, initialState)
    const router = useRouter()

    const { cart } = state

    // Handles Persisting of Cart
    useEffect(() => {
        const previousCart = JSON.parse(localStorage.getItem("VAULT_CART"))
        console.log("previous cart is ", previousCart)
        dispatch({type : ACTIONS.PERSIST_CART, payload : previousCart})
    }, [])

    useEffect(() => {
        localStorage.setItem("VAULT_CART", JSON.stringify(cart))
    }, [cart])





    /// Keeps the user logged in on Refresh.. using JWT from localStoreage
    useEffect(() => {
        const handleRefetchUser = async () => {
            const savedToken = localStorage.getItem('USER_TOKEN')
            if(!savedToken) return 

            const { data } = await axios.get("http://localhost:3000/api/auth/refreshUser", 
            { headers : {
                "authorization" : savedToken}
            })  
            data.token = savedToken
            console.log('getting user again')
            dispatch({type : ACTIONS.PERSIST_USER, payload : data})
        }
        handleRefetchUser()
    }, [])

    // Causes the tokens to be checked every 9 mins.. in case there is no organic refreshes.
    useEffect(() => {
        setTimeout(() => {
            setTokenCallback((p) => !p)
        }, 60000 * 9)
    }, [tokenCallback])



    /// Handles the checking of tokens 
    useEffect(() => {

        const checkTokens = async () => {
            const savedToken = localStorage.getItem('USER_TOKEN')
            if(!savedToken) return 
            console.log('refresh stuff running')
            try {
                const { data } = await axios.get('http://localhost:3000/api/auth/tokenStatus', 
                {
                    headers : {
                        "authorization" : savedToken
                    }
                })
                // console.log("checkTokens data is ", data)

                // Token isn't nearing expiry
                if(data.msg === 'ok') return 
 
            } catch (error) {
                // console.log(error.response)
                
                // Refresh Token near expiry..make user log in again 
                if(error.response.status === 401 && error.response.data.msg === 'refresh'){
                    try {
                        console.log('executing refresh')
                        dispatch({type : ACTIONS.PERSIST_USER, payload : {}})
                        localStorage.removeItem('USER_TOKEN')
                        Cookie.remove('refreshToken')
                        dispatch({type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'error', text : 'Session expired, please sign in'}})
                        router.push('/signin')

                        setTimeout(() => {
                            dispatch({type : ACTIONS.CLEAR_MESSAGE})
                        }, 2600)
                    } catch (error) {
                        console.log(error)
                    }

                }

                // Token nearly expired.. fetch and store a new one
                if(error.response.status === 401 && error.response.data.msg === 'token needed'){
                    try {
                        const { data } = await axios.get('http://localhost:3000/api/auth/refetchTokens')
                        // console.log('refresh data is', data)
                        localStorage.removeItem('USER_TOKEN')
                        localStorage.setItem('USER_TOKEN', data.token)
                        dispatch({type : ACTIONS.NEW_TOKEN, payload : data.token})
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
        
        checkTokens()


    }, [tokenCallback])


   


    return (
        <GlobalState.Provider value = {{state, dispatch}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalStateProvider
