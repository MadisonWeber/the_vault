import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    sold : { type : Number, default : 0},
    name : { type : String,  required : true},
    price : { type : Number, required : true},
    description : { type : String, required : true},
    brand : { type : String, required : true, trim : true},
    images : { type : [String], required : true }, 
    inStock : { type : Number, required : true},
    heroImage : { type : String, required : true}
})

let Dataset = mongoose.models.product || mongoose.model( 'product', productSchema)

export default Dataset