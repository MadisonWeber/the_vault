import { createContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import ACTIONS from './actions'


export const GlobalState = createContext()

const GlobalStateProvider = ({children}) => {

    const initialState = { user : {}, message : { category : '', text : ''}, cart : []}

    const [state, dispatch ] = useReducer(reducer, initialState)


    useEffect(() => {

        const handleRefetchUser = async () => {
            const savedToken = localStorage.getItem('USER_TOKEN')
            if(!savedToken) return 

            const { data } = await axios.post("http://localhost:3000/api/auth/refreshUser", 
            { token : savedToken})  

            dispatch({type : ACTIONS.PERSIST_USER, payload : data})
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
