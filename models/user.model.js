import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : { type : String, required : true, trim : true},
    role : { type : Number, default : 0},
    email : { type : String, required : true, unique : true, trim : true}, 
    password : { type : String, required : true, trim : true}
}, {
    timestamps : true
}
)

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)

export default Dataset