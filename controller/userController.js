// import model
const users = require('../models/userSchema')

// import jwt token
const jwt = require('jsonwebtoken');
//const carts = require('../models/cartSchema');


// signup

exports.signup = async(req,res)=>{
    console.log(req.body);
    const {name,email,mobile,pswd} = req.body
    if(!name || !email || !mobile || !pswd){
        res.status(403).json("All Inputs are required")
    }
    else{
        try{
            const preuser = await users.findOne({email})
            if(preuser){
                res.status(406).json("User Already exists")
            }
            else{
                const newuser = new users({
                    name,
                    email,
                    mobile,
                    pswd,
                    cart:[]
                })
                await newuser.save()
                res.status(200).json(newuser)
            }
        }
        catch(error){
            res.status(401).json(error)
        }
    }
}


// signin
exports.signin = async(req,res)=>{
    const {email,pswd} = req.body
    try{
        const preuser = await users.findOne({email,pswd})
        console.log(preuser);
        if(preuser){
            const token = jwt.sign({
                signInEmail:email
            },"burger123")
            console.log(token);
            res.status(200).json({preuser,token})
        } 
        else{
            res.status(403).json("Invalid Email or Password")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}


// add to cart
exports.addtocart = async (req,res) => {
    const {id, name, price, quantity, type, total} = req.body
    
    try{
        
        const {email} = req 
        console.log(email);
        const user = await users.findOne({email})
        console.log(user);
        const existingCartItem = user.cart.find((item)=>item.id === id)
        console.log(existingCartItem);
        console.log(user);
        if(existingCartItem){
            existingCartItem.quantity += 1;
            existingCartItem.total = existingCartItem.quantity * existingCartItem.price
            await user.save()
            res.status(200).json("Items added successfully")
        }else{
            const newItem ={
                id,
                name,
                price,
                type,
                quantity,
                total:price
            };
            console.log(newItem);
            user.cart.push(newItem)
            console.log(user.cart);
            await user.save(newItem);
            res.status(200).json("Item added to cart successfully");
        }
    }
    catch(error){
        res.status(404).json(error)
    }

}

// get cart
exports.getCart = async(req,res)=>{
    const {email} = req 
    console.log(email);
    
    try{
        const user = await users.findOne({email})
        console.log(user);
        const allItems = user.cart
        res.status(200).json(allItems)

    }catch(error){
        res.status(401).json(error)
    }
}


// increment cart
exports.incrementCart = async(req,res) => {
    const id = req.body.id
    console.log(id);
    try{
        const {email} = req
        console.log(email);
        const user = await users.findOne({email})
        console.log(user);
        const increItems = user.cart.find((item)=> item.id === id)
        if(increItems){
            increItems.quantity+=1
            increItems.total=increItems.quantity*increItems.price
            await user.save()
            res.status(200).json("Incremented Successfully")
        }else{
            return res.status(404).json({ error: "Item not found in the cart" });
        }

    }catch(error){
        res.status(403).json(error)
    }
}

// decrement cart
exports.decrementCart = async(req,res)=>{
    const {id} = req.body
    console.log(id);
    try{
        const {email} = req
        console.log(email);
        const user = await users.findOne({email})
        console.log(user);
        const decreItems = user.cart.find((item)=>item.id === id)
        if(decreItems){
            decreItems.quantity-=1
            if(decreItems.quantity===0){
                console.log("hey fuck");
                user.cart = user.cart.filter((item)=>item.id!==id)
                await user.save()
                console.log("done and dusted");
                res.status(200).json("Cart is Empty")
            }else{
                decreItems.total = decreItems.quantity*decreItems.price
                await user.save()
                res.status(200).json("Item decremented")
            }
        }else{
            res.status(404).json("Item not found")
        }
    }catch(error){
        res.status(403).json(error)
    }
}


// empty cart
exports.emptyCart = async(req,res)=>{
    const {email} = req
    console.log(email);
    try{
        const user = await users.findOne({email})
        console.log(user.cart);
        user.cart = []
        await user.save()
        res.status(200).json("Cart is Cleared")
    }catch(error){
        res.status(403).json(error)
    }
}

//get user details
exports.getUserDetails = async(req,res)=>{
    const {email} = req
    console.log(email);
    try{
        const user = await users.findOne({email})
        console.log(user);
        res.status(200).json(user)
    }catch(error){
        res.status(401).json(error)
    }
}



// // add items
// exports.addtocart = async (req,res)=>{
//     const{id,name,price,quantity,type,total} = req.body
//     try{
//         //check item is in cart model
//         const item = await users.findOne({'cart.id':id})
//         console.log(item);
//         if(item){
//             item.quantity+=1
//             item.total=item.quantity*item.price
//             await item.save()
//             res.status(200).json("Items added Successfully")
//         }
//         else{
//             console.log('Paulson');
//             const newItem = new users.cart.push(
//                 {
//                     id: id,
//                     name: name,
//                     price: price,
//                     type: type,
//                     quantity: quantity,
//                     total: price,
//                 }
//             )
//             console.log(newItem);
//             await newItem.save()
//             res.status(200).json("Item added Successfully")
            

//             // const newitem = new users.cart[({
//             //     id,
//             //     name,
//             //     price,
//             //     type,  
//             //     quantity,
//             //     total:price
//             // })]
//             // //save mongodb
//             // await newitem.save()

//             // newItem = {
//             //     id: id,
//             //     name: name,
//             //     price: price,
//             //     type: type,
//             //     quantity: quantity,
//             //     total: price,
//             //   };
//             //   users.cart.push(newItem); 
//             // await newItem.save();
            
//         }
//     }
//     catch(error){
//         res.status(404).json(error)
//     }
// }

// add items to a user's cart
// exports.addtocart = async (req, res) => {
//     const { id, name, price, quantity, type, total, email } = req.body;

//     try {
//         // Check if the user exists
//         const user = await users.findOne({ email });

//         if (!user) {
//             return res.status(404).json("User not found");
//         }

//         // Find the item with the given id in the user's cart
//         const item = user.cart.find(cartItem => cartItem.id === id);

//         if (item) {
//             // If the item exists, increment its quantity and update the total
//             item.quantity += 1;
//             item.total = item.quantity * item.price;
//             await item.save();
//         } else {
//             // If the item doesn't exist, create a new cart item
//             const newItem = {
//                 id: id,
//                 name: name,
//                 price: price,
//                 type: type,
//                 quantity: quantity,
//                 total: price,
//             };

//             // Push the new item to the cart array
//             user.cart.push(newItem);
//         }

//         // Save the user document with the updated cart
//         await user.save();

//         res.status(200).json("Item(s) added to cart Successfully");
//     } catch (error) {
//         console.error('Error adding item(s) to cart:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };