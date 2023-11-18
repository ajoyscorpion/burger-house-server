// import items collection
const carts = require("../models/cartSchema");

// add items
exports.addtocart = async (req,res)=>{
    const{id,name,price,quantity,type,total} = req.body
    const {email} = req
    console.log(req); 
    try{
        //check item is in carts model
        const item = await carts.findOne({id})
        console.log(item);
        if(item){
            item.quantity+=1
            item.total=item.quantity*item.price
            await item.save()
            res.status(200).json("Items added Successfully")
        }
        else{
            const newitem = new carts({
                id,name,email,price,type,quantity,total:price
            })
            console.log(newitem);
            //save mongodb
            await newitem.save()
            res.status(200).json("Item added Successfully")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

// logic to get cart
exports.getCart = async (req,res)=>{
    try{
        const allItems = await carts.find()
        res.status(200).json(allItems)
    }
    catch(error){
        res.status(401).json(error)
    }
}

// increment cart item
exports.incrementCart = async (req,res)=>{
    const {id} = req.params
    try{
        // check id is carts model
        const item = await carts.findOne({id})
        item.quantity+=1
        item.total =item.quantity*item.price
        // if yes then increment count, update total, send all items of carts as res
        await item.save()
        const allItems = await carts.find()
        res.status(200).json(allItems)
    }
    catch(error){
        res.status(401).json(error)
    }
}

// decrement cart item
exports.decrementCart = async (req,res)=>{
    const {id} = req.params
    try{
        const item = await carts.findOne({id})
        if(item){
            item.quantity-=1
            if(item.quantity===0){
                await carts.deleteOne({id})
                const allItems = await carts.find()
                res.status(200).json(allItems)
            }
            else{
                item.total =item.quantity*item.price
                // if yes then increment count, update total, send all items of carts as res
                await item.save()
                const allItems = await carts.find()
                res.status(200).json(allItems)
            }
        }
        else{
            res.status(404).json("not found")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

// empty cart
exports.emptyCarts = async (req,res)=>{
    try{
        await carts.deleteMany({})
        //const allItems = carts.find()
        res.status(200).json("Cart is Cleared")
    }
    catch(error){
        res.status(401).json(error)
    }
}
