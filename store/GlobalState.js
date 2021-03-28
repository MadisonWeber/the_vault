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

    const { cart, user } = state

 
   



    // Handles Persisting of Cart
    useEffect(() => {
        const previousCart = JSON.parse(localStorage.getItem("VAULT_CART"))
        if(previousCart) dispatch({type : ACTIONS.PERSIST_CART, payload : previousCart})
    }, [])

    useEffect(() => {
        localStorage.setItem("VAULT_CART", JSON.stringify(cart))
    }, [cart])



    /// Keeps the user logged in on Refresh.. using JWT from localStoreage
    useEffect(() => {
        const handleRefetchUser = async () => {
            try{                
                const savedToken = localStorage.getItem('USER_TOKEN')
                if(!savedToken) return 

                const { data } = await axios.get(`${process.env.BASE_URL}api/auth/refreshUser`, 
                { headers : {
                    "authorization" : savedToken}
                }
                )  
                data.token = savedToken
                console.log('getting user again')
                dispatch({type : ACTIONS.PERSIST_USER, payload : data})
            }catch(err){
                console.log('from refetch user', err)
            }
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
                const { data } = await axios.get(`${process.env.BASE_URL}api/auth/tokenStatus`, 
                {
                    headers : {
                        "authorization" : savedToken
                    }
                })
             
                // Token isn't nearing expiry
                if(data.msg === 'ok') return 
 
            } catch (error) {
                
                // Refresh Token near expiry or expired..make user log in again 
                if(error.response.status === 401 && error.response.data.msg === 'refresh' || error.response.status === 403){
                    
                        console.log('executing refresh')
                        dispatch({type : ACTIONS.PERSIST_USER, payload : {}})
                        localStorage.removeItem('USER_TOKEN')
                        Cookie.remove('refreshToken')
                        dispatch({type : ACTIONS.UPDATE_MESSAGE, payload : { category : 'error', text : 'Session expired, please sign in'}})
                        router.push('/signin')

                        setTimeout(() => {
                            dispatch({type : ACTIONS.CLEAR_MESSAGE})
                        }, 2600)
                }

                // Token nearly expired.. fetch and store a new one
                if(error.response.status === 401 && error.response.data.msg === 'token needed'){
                    try {
                        const { data } = await axios.get(`${process.env.BASE_URL}api/auth/refetchTokens`)
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
