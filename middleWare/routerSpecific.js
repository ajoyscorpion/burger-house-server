// import jsonwebtoken
const jwt = require('jsonwebtoken')

// logic to check whether user is sign in or not
const signInMiddleware = (req,res,next)=>{
    console.log("Router Specific Middleware");
    const token = req.headers['access-token']
    try{
        // verify token
        const {signInEmail} = jwt.verify(token,'burger123')
        console.log(signInEmail);
        req.email = signInEmail
        next()
    }
    catch{
        res.status(401).json("Please Login")
    }
}

module.exports={
    signInMiddleware
}