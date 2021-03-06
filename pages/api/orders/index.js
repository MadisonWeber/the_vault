import Order from '../../../models/order.model'
import connectDB from '../../../utils/connectDB'

connectDB()

export default (req, res) => {
    switch(req.method){
        case 'POST':
            return postOrder(req, res)
        default:
            return
    }
}

const postOrder = async (req, res) => {
    const { userId, address, cart, total} = req.body 
    try {
        if(cart.length < 1) return res.status(400).json({msg : "Must have items in cart to order"})
        if(!userId) return res.status(400).json({msg : "Did not recieve user id"})
        if(!address) return res.status(400).json({msg : "Did not recieve address"})
        if(!address) return res.status(400).json({msg : "Did not recieve total"})

        const newOrder = new Order({
            address, 
            user : userId, 
            cart,
            total
        })

        const completedOrder = await newOrder.save()

        return res.status(200).json({order : completedOrder})

        
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
    
}