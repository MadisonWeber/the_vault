import connectDB from '../../../utils/connectDB';
import User from '../../../models/user.model';
import jwt from 'jsonwebtoken'

connectDB()

export default async (req, res) => {
    try {

        const { token } = req.body
        const  { id }  = jwt.verify(token, process.env.JWT_SECRET)
      
        const user = await User.findById(id)
        if(!user) return res.status(400).json({msg : 'No user with that ID'})

        let newToken = jwt.sign({id : user._id} ,  process.env.JWT_SECRET)

        return res.status(200).json({name : user.name, email : user.email, role : user.role, _id : user._id, createdAt : user.createdAt, token : newToken })


    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}