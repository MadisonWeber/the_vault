import connectDB from '../../../utils/connectDB'
import bcrypt from 'bcrypt'
import Users from '../../../models/user.model'
import jwt from 'jsonwebtoken'

connectDB()

export default (req, res) => {
    switch(req.method){
        case 'POST': 
            signin(req, res)
            break
    }
} 



const signin = async (req, res) => {
    try{
        const { email, password } = req.body
        const existingUser = await Users.findOne({email}).select()
        if(!existingUser) return res.status(400).json({msg: `No user registered under ${email}`})
       
        const passwordMatch = await bcrypt.compare(password, existingUser.password)
        if(!passwordMatch) return res.status(409).json({msg : "Password doesn't match what we have on file."})


        const token = jwt.sign({id : existingUser._id }, process.env.JWT_SECRET)

        res.status(200).json({msg : `Logged in ${email} `, user : {name : existingUser.name, email : existingUser.email, role : existingUser.role, _id : existingUser._id, createdAt : existingUser.createdAt, token : token } })

    }catch(err){
        return res.status(500).json({msg : err.message})
    }

}
