import connectDB from '../../../../utils/connectDB'
import Order from '../../../../models/order.model'
// import authorize from '../../../../middleware/auth'

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
        // const { id } = await authorize(req, res)

        const { id } = req.query
        const orders =  await Order.find({user : id})
       
        if(!orders) return res.status(400).json({msg : 'Order does not exist.'})
     
        return res.status(200).json(orders)

    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}