import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    address : { type : Object, required : true},
    user : {type : mongoose.Types.ObjectId, ref : 'users'},
    delivered : { type : Boolean, default : false},
    cart : { type : Array, required : true},
    total : { type : Number, required : true}

}, {
    timestamps : true
})

let DataSet = mongoose.models.order || mongoose.model('order', orderSchema)

export default DataSet
