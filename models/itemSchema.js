// import mongoose
const mongoose = require('mongoose')

//define schema to store data in a collection
const itemsSchema = mongoose.Schema({
    id: {
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

// create a model for collection
const items = mongoose.model("items",itemsSchema)

// export model
module.exports = items