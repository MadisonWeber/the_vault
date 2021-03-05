import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    address : { type : Object, required : true},
    userId : {type : String, required : true},
    
})
