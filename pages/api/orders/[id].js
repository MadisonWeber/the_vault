import connectDB from '../../../utils/connectDB'
import Order from '../../../models/order.model'
import User from '../../../models/user.model'


connectDB()

export default (req, res) => {
    switch(req.method){
        case "GET":
            return getOrder(req, res)
        default:
            return 
    }
}

// Gets Single User Order by id

const getOrder = async (req, res) => {
    try {
        const { id } = req.query
        const order =  await Order.findById(id).populate({ path: 'user', select : "-password", model: User })
        if(!order) return res.status(400).json({msg : 'Order does not exist.'})
     
        return res.status(200).json(order)

    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}