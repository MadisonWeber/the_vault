import Layout from '../components/Layout'
import { useContext } from 'react'
import { GlobalState } from "../store/GlobalState"
import Link from 'next/link'
import styles from '../styles/cart.module.scss'

const cart = () => {

    const { state } = useContext(GlobalState)
    const { cart, user } = state


    const NoUser = () => {
        return (
                <div className = {styles.noUser}>
                    <p>You need to <Link href = "/signin">Signin</Link> to use the Cart</p>
                    
                </div>
        )
    }

    const EmptyCart = () => {
        return(
                <div className = {styles.noUser}>
                     <p>You have no <Link href = "/products">Products</Link> in the Cart</p>
                </div>
        )
    }


   

    return (
        <Layout description = 'the vault user cart'>
            <div className = {styles.cart}>
                <h1>Your Cart</h1>
                {
                    !user.name &&  <NoUser />
                }
                {
                    user.name && Object.keys(cart).length < 1 && <EmptyCart />
                }
                {/* Items on left side.. totals and checkout on right.  */}
            </div>
        </Layout>
    )
}

export default cart
