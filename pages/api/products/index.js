import Product from '../../../models/product.model'
import connectDB from '../../../utils/connectDB'
import authorize from '../../../middleware/auth'

connectDB()

export default (req, res) => {
    switch(req.method){
        case 'GET': 
            return getProducts(req, res)
        case 'POST':
            return postProduct(req, res)
        case 'PATCH':
            return patchProduct(req, res)
        default :
            return 
    }
}

// Gets and returns all products
const getProducts = async (req, res) => {
    try{

        const products = await Product.find()
        if(products.length < 1) return res.status(400).json({msg : 'could not find any products'})

        return res.status(200).json({products : products})
    }catch(error){
        return res.status(500).json({msg : error.message})
    }

}

// Checks and patches products in stock or not

const patchProduct = async(req, res) => {
    
    try {
        
        const { id } = await authorize(req, res)
        const { productId, quantity } = req.body
        console.log('productID is ', productId)
        console.log('quantity is', quantity)
        
        const product = await Product.findById(productId)
        if(!product) return res.status(400).json({msg : 'no product with that id'})

        if(product.inStock - quantity <= 0) return res.status(400).json({ msg : `Product ${product.name}, does not have enough in stock to fill that order.`})  
        product.sold = product.sold + quantity
        product.inStock = product.inStock - quantity
        const retProduct = await product.save()
        return res.status(200).json(retProduct)

    } catch (error) {
        return res.status(500).json({msg : error.message, error : error})

    }
}




// Not used on live site, just for me to add products easily 

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