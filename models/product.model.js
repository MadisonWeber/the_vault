import mongoose, { mongo } from 'mongoose';

const productSchema = new mongoose.Schema({
    sold : { type : Number, default : 0},
    name : { type : String,  required : true},
    price : { type : Number, required : true},
    description : { type : String, required : true},
    category : { type : String, required : true},
    images : { type : [tring], required }, 
    inStock : { type : Number, required : true}
})

let Dataset = mongoose.models.product || mongoose.model( 'product', productSchema)

export default Dataset