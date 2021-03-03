import connectDB from '../../../utils/connectDB'
import bcrypt from 'bcrypt'
import Users from '../../../models/user.model'
import jwt from 'jsonwebtoken'

connectDB()

export default (req, res) => {
    switch(req.method){
        case 'POST': 
            return register(req, res)
        default:
            return 
    }
} 



const register = async (req, res) => {
    try{
        const { email, name, password } = req.body
        const checkEmail = await Users.findOne({email})
        if(checkEmail) return res.status(400).json({msg: `Already a user registered for ${email}.. sign in instead.`})
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Users({
            name, 
            email, 
            password : hashedPassword
        })

        const user = await newUser.save()

        const token = jwt.sign({id : user._id }, process.env.JWT_SECRET)

        return res.status(200).json({msg : `User ${name} created. Get Shopping!`, user : {name : user.name, email : user.email, role : user.role, _id : user._id, createdAt : user.createdAt, token : token }})

    }catch(err){
        return res.status(500).json({msg : err.message})
    }

}

