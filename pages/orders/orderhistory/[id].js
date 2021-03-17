import Layout from '../../../components/Layout'
import axios from 'axios'
import styles from '../../../styles/orderhistory.module.scss'
import { useContext } from 'react'
import { GlobalState } from '../../../store/GlobalState'
import Link from 'next/link'


const orderhistory = ({data}) => {

    const { state } = useContext( GlobalState )
    const { user } = state

    // console.log('data is ', data)



    if(data.length < 1){
        return (
        <Layout description = "The Vault user order page">
            <div className = {styles.history}>
                <h1>Your Orders</h1>
                <div className = {styles.history__container__none}>
                    <h4>You Have No Previous Orders with this Email</h4>
                </div>
            </div>
        </Layout>
        )
    }


    return (
        <Layout description = "The Vault user order page">
            <div className = {styles.history}>
                <h1>Your Orders</h1>
                <div className = {styles.history__container}>
                    <h4>{user.name} Orders</h4>
                    <p>{user.email}</p>
                    <table>
                        <thead>
                            <tr>
                                <th className = {styles.remove}>Order Id</th>
                                <th>Date</th>
                                <th># Items</th>
                                <th>Total</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(order => (
                                <tr key = { order._id }>
                                    <td className = {styles.remove}>{order._id}</td>
                                    <td>{ new Date(order.createdAt).toLocaleString()}</td>
                                    <td>{order.cart.length}</td>
                                    <td styles = {{whiteSpace : 'nowrap'}}>$ {(order.total).toFixed(2)}</td>
                                    <td className = {styles.go__to__link}><Link href = {`/orders/${order._id}`}>See Confirmation</Link></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </Layout>

    )
}

export default orderhistory


export const getServerSideProps = async (ctx) => {

    const { id } = ctx.params
    const { data }  = await axios.get(`http://localhost:3000/api/orders/orderhistory/${id}`)

    return {
        props : {
            data
        }
    }
}