import connectDB from '../../../utils/connectDB';
import User from '../../../models/user.model';
import authorize from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
  
    try {
        const { id } = await authorize(req, res)
    
        const user = await User.findById(id)
        if(!user) return res.status(400).json({msg : 'No user with that ID'})

        return res.status(200).json({name : user.name, email : user.email, role : user.role, _id : user._id, createdAt : user.createdAt})


    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}