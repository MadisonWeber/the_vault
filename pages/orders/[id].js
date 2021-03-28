import Layout from '../../components/Layout'
import axios from 'axios'
import { useEffect, useContext } from 'react'
import { GlobalState } from '../../store/GlobalState'
import Link from 'next/link'
import ACTIONS from '../../store/actions'
import styles from "../../styles/confirmOrder.module.scss"
import sendEmail from '../../utils/email'



const confirmOrder = ({data}) => {

    const { dispatch } = useContext(GlobalState)

    useEffect(() => {
        dispatch({type : ACTIONS.ORDER_SUCCESS})
    }, [])

    return (
        <Layout description = 'The Vault Order Confirmation page'>
            <div className = {styles.confirm}>
                <div className = {styles.inner}>
                    <div className = {styles.confirm__info}>
                        <h2>This is your order confirmation</h2>
                        <h5 className = {styles.id}>Order Details</h5>
                        <p>Order Id : {data._id}</p>
                        <p>Date : { new Date(data.createdAt).toLocaleDateString()}</p>
                        <p>Time : {new Date(data.createdAt).toLocaleTimeString()}</p>
                        <p>Total : $ {(data.total).toFixed(2)}</p>
                        <h5>Order Address</h5>
                        <span>{data.address.city}</span>
                        <span>{data.address.street}</span>
                        <span>{data.address.postalCode}</span>
                        <p>Confirmation email sent to:</p>
                        <p className = {styles.email}>{data.user.email}</p>
                        <p>Thank you for Shopping at The Vault!</p>
                        <Link href = "/"><button>Go Back to Website</button></Link>
                    </div>
                    <img src='/static/images/bg.jpg' alt="closet"/>
                </div>
            </div>
        </Layout>

    )
}

export default confirmOrder



export const getServerSideProps = async ({params}) => {

    const { id } = params
    const { data } = await axios.get(`api/orders/${id}`)

    return { 
        props: {
            data 
        }
    }
}