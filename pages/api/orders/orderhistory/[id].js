import connectDB from '../../../../utils/connectDB'
import Order from '../../../../models/order.model'
import User from '../../../../models/user.model'

connectDB()

export default (req, res) => {
    switch(req.method){
        case "GET":
            return getOrderHistory(req, res)
        default:
            return 
    }
}

const getOrderHistory = async (req, res) => {
    try {
        const { id } = req.query
        console.log('id is', id)
        const orders =  await Order.find({user : id})
        console.log('orders are ', orders)
        if(!orders) return res.status(400).json({msg : 'Order does not exist.'})
     
        return res.status(200).json(orders)

    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}