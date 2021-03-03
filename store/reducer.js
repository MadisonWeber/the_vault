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
        case ACTIONS.LOGOUT:
            return { ...state, user : {}, cart : [], message : { text : 'User Logged Out', category : 'info'}}
        case ACTIONS.ADD_CART:
            return { ...state, cart : [ action.payload  , ...state.cart ], message : { text : `Added ${action.payload.brand}  ${action.payload.name} shoes to cart`, category : 'info'} }
        case ACTIONS.PERSIST_USER: 
            return { ...state, user : action.payload}
        default:
            return state
    }
}


export default reducer