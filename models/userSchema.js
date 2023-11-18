const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    id: {
        type:Number,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    total: {
        type:Number,
        required:true
    }
})


const userSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    pswd:{
        type:String,
        required:true,
        unique:true
    },
    cart:[cartSchema],
})



const users = mongoose.model("users",userSchema)

module.exports = users