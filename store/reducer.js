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
        case ACTIONS.REMOVE_CART:
            const newCart = state.cart.filter( (item) => {
                return item._id !== action.payload.id
            })
            return { ...state, cart : newCart, message : { text : `Removed ${action.payload.name} shoes from cart`, category : 'info'}}
        case ACTIONS.ADD_QUANTITY:
            const newCartTwo = state.cart.map( (item) => {
                if(action.payload.id === item._id) return {...item, quantity : item.quantity + 1}
                return item
            })
            return { ...state, cart : newCartTwo }
        case ACTIONS.MINUS_QUANTITY:
            const newCartThree = state.cart.map( (item) => {
                if(action.payload.id === item._id) return {...item, quantity : item.quantity - 1}
                return item
            })
            return { ...state, cart : newCartThree}
        case ACTIONS.PERSIST_USER: 
            return { ...state, user : action.payload}
        case ACTIONS.ORDER_SUCCESS:
            return {...state, cart : []}
        default:
            return state
    }
}


export default reducer