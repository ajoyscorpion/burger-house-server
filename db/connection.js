//import mongoose
const mongoose = require('mongoose')

// get connection string
const DB = process.env.DATABASE

// connect the mongoose atlas
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Mongodb Atlas : cart database connected Successfully");
}).catch((error)=>{
    console.log("Error:",error);
})