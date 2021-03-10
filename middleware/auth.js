import jwt from 'jsonwebtoken'
// import Users from '../models/user.model'

const authorize = async (req, res) => {

    const token = req.headers.authorization

    if(!token) return res.status(400).json({msg : 'Invalid Authentication'})
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return { id : decoded.id}
        // const user = await Users.findOne({_id : decoded.id})
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            console.log('token expired!')
            return res.status(401).json({msg : 'Token Expired'})
        }else{
            return res.status(403).json({msg : 'Token is wrong'})
        }
    }
}



export default authorize