import connectDB from '../../../utils/connectDB';
import Product from '../../../models/product.model'

export default (req, res) => {
    switch(req.method){
        case 'GET': 
            return getProduct(req, res)
        default:
            return 
    }
}


const getProduct = async (req, res) => {
    try {
        const { id } = req.query
        const product = await Product.findById(id)
        
        if(!product) return res.status(400).json({msg : 'Product does not exist.'})
     
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}