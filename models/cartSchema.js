// // import mongoose
// const mongoose = require('mongoose')

// //define schema to store data in a collection
// const cartSchema = mongoose.Schema({
//     id: {
//         type:Number,
//         required:true,
//         unique:true
//     },
//     name: {
//         type:String,
//         required:true
//     },
//     email: {
//         type:String,
//         required:true,
//         unique:true
//     },
//     price: {
//         type:Number,
//         required:true
//     },
//     type: {
//         type:String,
//         required:true
//     },
//     quantity: {
//         type:Number,
//         required:true
//     },
//     total: {
//         type:Number,
//         required:true
//     }
// })

// // create a model for collection
// const carts = mongoose.model("carts",cartSchema)

// // export model
// module.exports = carts