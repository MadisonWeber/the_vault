import jwt from 'jsonwebtoken'


const authorize = async (req, res) => {

    try {
        
        const token = req.headers.authorization
        if(!token) return res.status(400).json({msg : 'Invalid Authentication'})
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return { id : decoded.id}
    } catch (error) {
        return res.status(403).json({msg : error.message})
    }

}



export default authorize