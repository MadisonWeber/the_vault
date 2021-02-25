import ACTIONS from './actions'

const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS.SIGNIN:
            return{ ...state, user : action.payload.user, message : action.payload.message}
        case ACTIONS.UPDATE_MESSAGE:
            return { ...state, message : action.payload }
        case ACTIONS.CLEAR_MESSAGE:
            return {...state, message : { text : '', category : ''}}
        case ACTIONS.REGISTER:
            return { ...state, user : action.payload.user, message : action.payload.message}
        default:
            return state
    }
}


export default reducer