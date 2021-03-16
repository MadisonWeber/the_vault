import Layout from '../components/Layout'
import LoaderTwo from '../components/LoaderTwo'
import { useContext, useEffect, useState } from 'react'
import { GlobalState } from "../store/GlobalState"
import ACTIONS from '../store/actions'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '../styles/cart.module.scss'
import sendEmail from '../utils/email'

const cart = () => {

    const { state, dispatch } = useContext(GlobalState)
    const { cart, user } = state
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ deliverInfo, setDeliverInfo ] = useState({city : '', street: '', postalCode : '' })
    const [ loading , setLoading ] = useState(false)
    const { city, street, postalCode } = deliverInfo

    const router = useRouter()

    useEffect(() => {
        const cartCost = cart.reduce( (acc, cur) => {
            return acc + (cur.price * cur.quantity)
        }, 0)
        setTotalPrice(cartCost)
       
    },[cart])

    const handleChange = (e) => {
        const { name, value } = e.target
        setDeliverInfo({...deliverInfo, [name] : value})
    }   

    const removeFromCart = (item) => {
        dispatch({type : ACTIONS.REMOVE_CART, payload : {id : item._id, name : item.name}})

        setTimeout(() => {
            dispatch({type : ACTIONS.CLEAR_MESSAGE})
        }, 2000)
    }

    const plusQuantity = (id) => {
        dispatch({type : ACTIONS.ADD_QUANTITY, payload : {id, id}})
    }

    const minusQuantity = (id) => {
        dispatch({type : ACTIONS.MINUS_QUANTITY, payload : {id, id}})
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const { data }  = await axios.post('http://localhost:3000/api/orders', {
                // userId : user._id,
                address : deliverInfo,
                cart,
                total : totalPrice.toFixed(2)
            }, {
                headers : {
                    "authorization" : user.token}
            })

            //uncomment for production
            // sendEmail(data)
           router.push(`/orders/${data.order._id}`)
            setLoading(false)

        }catch(error){
            setLoading(false)
            console.log(error)
        }
    }



    if(!user.name){
        return (
            <Layout>
                <div className = {styles.cart}>
                    <h2>Your Cart</h2>
                    <div className = {styles.noUser}>
                       <p>You need to <Link href = "/signin">Signin</Link> to use the Cart</p>
                    </div>
                </div>
            </Layout>
        )
    }

    if(user.name && Object.keys(cart).length < 1){
        return(
        <Layout>
            <div className = {styles.cart}>
                <h2>Your Cart</h2>
                <div className = {styles.noUser}>
                      <p>You have no <Link href = "/products">Products</Link> in the Cart</p>
                </div>
            </div>
        </Layout>
        )
    }

   

    return (
        <Layout description = 'the vault user cart'>
            <div className = {styles.cart}>
                <h2>Your Cart</h2>
                <div className = {styles.cart__inner}>
                    <div className = {styles.cart__left}>
                        <h3 className = {styles.heading} >Items</h3>
                        <div className = {styles.cart__items}>
                            {
                            cart.map(item => (
                                <div key = {item._id} className = {styles.cart__item}>
                                    <img className = {styles.item__image} src={item.heroImage} alt={item.heroImage}/>
                                    <div className = {styles.item__info}>
                                        <p> {item.brand} <span>{item.name}</span></p>
                                        <span className = {styles.inv_price}>Price: $ {item.price}</span>
                                        <span> Left in Stock : {item.inStock}</span>
                                    </div>
                                    <div className = {styles.choose__quantity}>
                                        <button onClick = {()=> plusQuantity(item._id)}>+</button>
                                        <p>Quantity : {item.quantity}</p>
                                        <button onClick = {() => minusQuantity(item._id)} disabled = {item.quantity <= 1}>-</button>
                                    </div>
                                    <i className = 'fas fa-times' onClick = {() => removeFromCart(item)}/>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className = {styles.checkout}>
                        <h3 className = {styles.heading} >Checkout</h3>
                        <div className = {styles.checkout__container}>
                            <form className = {styles.checkout__form} id = 'checkout__form' onSubmit = {handleSubmit}>
                                <h5>Fill in your address to checkout</h5>
                                <label htmlFor="street">Street</label>
                                <input type="text" id = "street" name = 'street' value = {street} onChange = {handleChange}/>
                                <label htmlFor="city">City</label>
                                <input type="text" id = "city"  name = 'city' value = {city} onChange = {handleChange}/>
                                <label htmlFor="postalCode">Postal Code</label>
                                <input type="text" id = "postalCode" name ='postalCode' value = {postalCode} onChange = {handleChange}/>
                                <div className = {styles.total__holder__top}>
                                    <p>Cart Total :</p>
                                    <span>$ {(totalPrice).toFixed(2)}</span>
                                </div>
                                 <div className = {styles.total__holder}>
                                    <p>Total After Tax :</p>
                                    <span>$ {(totalPrice * 1.15).toFixed(2)}</span>
                                </div>
                                <button type="submit" form="checkout__form" > {loading ? <LoaderTwo/> : "Checkout" }</button>
                            </form>
                            
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default cart
