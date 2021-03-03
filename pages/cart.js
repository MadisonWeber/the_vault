import Layout from '../components/Layout'
import { useContext } from 'react'
import { GlobalState } from "../store/GlobalState"
import Link from 'next/link'
import styles from '../styles/cart.module.scss'

const cart = () => {

    const { state } = useContext(GlobalState)
    const { cart, user } = state

    console.log('cart is', cart)


    if(!user.name){
        return (
            <Layout>
                <div className = {styles.cart}>
                    <h1>Your Cart</h1>
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
                <h1>Your Cart</h1>
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
                <h1>Your Cart</h1>
                <div className = {styles.cart__inner}>
                    <div className = {styles.cart__items}>
                        {/* <h3>Items</h3> */}
                        {
                        cart.map(item => (
                            <div key = {item._id} className = {styles.cart__item}>
                                <img className = {styles.item__image} src={item.heroImage} alt={item.heroImage}/>
                                <div className = {styles.item__info}>
                                    <p> {item.brand} <span>{item.name}</span></p>
                                    <span> Left in Stock : {item.inStock}</span>
                                </div>
                                <div className = {styles.choose__quantity}>
                                    <button>+</button>
                                    <p>Quantity : 1</p>
                                    <button>-</button>
                                </div>
                                <i className = 'fas fa-times' />
                            </div>
                        ))
                        }
                    </div>
                    <div className = {styles.checkout}>
                        <h3>Checkout</h3>
                        <p>Cart Total : </p>
                        <button>Checkout</button>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default cart
