import { createContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import ACTIONS from './actions'
import Cookie from 'js-cookie'


export const GlobalState = createContext()

const GlobalStateProvider = ({children}) => {

    const initialState = { user : {}, message : { category : '', text : ''}, cart : []}

    const [state, dispatch ] = useReducer(reducer, initialState)


    useEffect(() => {

        const handleRefetchUser = async () => {
            const savedToken = localStorage.getItem('USER_TOKEN')
            if(!savedToken) return 

            // try {
                const { data } = await axios.get("http://localhost:3000/api/auth/refreshUser", 
                { headers : {
                    "authorization" : savedToken}
                })  
    
                data.token = savedToken
    
                console.log('getting user again')
                dispatch({type : ACTIONS.PERSIST_USER, payload : data})
            // } catch (error) {
            //     console.log(error.response.status)
            //     if(error.response.status === 401){
            //         let newToken = await axios.get("http://localhost:3000/api/auth/refetchTokens")
            //         const updatedUser = { ...state.user, token : newToken.token}
            //         dispatch({type : ACTIONS.PERSIST_USER, payload : updatedUser})

            //         // handleRefetchUser()
            //     }
            // }

        }

        handleRefetchUser()

    }, [])



   


    return (
        <GlobalState.Provider value = {{state, dispatch}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalStateProvider
