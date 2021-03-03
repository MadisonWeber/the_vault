import Product from '../../../models/product.model'
import connectDB from '../../../utils/connectDB'


connectDB()

export default (req, res) => {
    switch(req.method){
        case 'GET': 
            return getProducts(req, res)
        case 'POST':
            return postProduct(req, res)
        default :
            return 
    }
}

const getProducts = async (req, res) => {
    try{

        const products = await Product.find()
        if(products.length < 1) return res.status(400).json({msg : 'could not find any products'})

        return res.status(200).json({products : products})
    }catch(error){
        return res.status(500).json({msg : error.message})
    }

}

const postProduct = async (req, res) => {
    try {
        
        const { name, price, description, brand, images, inStock, heroImage} = req.body
        const newProduct = new Product ({
            name, 
            price, 
            description, 
            brand, 
            images,
            heroImage,  
            inStock
        })

        const prodRes = await newProduct.save()

        return res.status(200).json({prodRes})

    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}