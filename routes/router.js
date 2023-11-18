// import express
const express = require('express')

//import item controller
const itemsController = require('../controller/itemsController')

//import cart controller
const cartController = require('../controller/cartController')

// import user controller
const userController = require('../controller/userController')

// import middleware
const middleware = require('../middleWare/routerSpecific')


// to create route using express
const router = new express.Router

// route for get items
router.get("/menu/items",itemsController.getItems)

// route to add and increment item
router.post('/addItem',middleware.signInMiddleware,userController.addtocart)

//router to get cart
router.get('/cartItems',middleware.signInMiddleware,userController.getCart)

//router to increment 
router.post('/increment',middleware.signInMiddleware,userController.incrementCart)

// router to decrement
router.post('/decrement',middleware.signInMiddleware,userController.decrementCart)

// router to empty cart
router.delete('/emptycart',middleware.signInMiddleware,userController.emptyCart)

// router to get userdetails
router.get('/userdetails',middleware.signInMiddleware,userController.getUserDetails) 

// router to signup
router.post('/signup',userController.signup)

// router to login
router.post('/signin',userController.signin)
   
// export router
module.exports = router     