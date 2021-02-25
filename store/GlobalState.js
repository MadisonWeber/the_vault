import { createContext, useReducer } from 'react'
import reducer from './reducer'


export const GlobalState = createContext()

const GlobalStateProvider = ({children}) => {

    const initialState = { user : {}, message : { catgeory : '', text : ''}}

    const [state, dispatch ] = useReducer(reducer, initialState)


    return (
        <GlobalState.Provider value = {{state, dispatch}}>
            {children}
        </GlobalState.Provider>
    )
}

export default GlobalStateProvider
