// import items collection
const items = require("../models/itemSchema")

// logic to get all products
exports.getItems = async (req,res)=>{
    try{
        const allItems = await items.find()
        res.status(200).json(allItems)
    }
    catch(error){
        res.status(401).json(error)
    }
}