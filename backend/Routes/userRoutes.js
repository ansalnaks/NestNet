const express=require('express')
const router=express.Router()
const{sendmessage,getmesssage}=require('../Cotroller/userController')
const{getCart,addToCart, delCart, payment, getPayment, indpayment, agentpayment}=require('../Cotroller/cartController')
const{addtowishlist,getwish,delwishlt}=require('../Cotroller/wishlistcontroller')
const authMiddleware=require('../middleware/authmiddleware')

router.post("/sendmessage",sendmessage)
router.get("/getmessage",getmesssage)
router.post('/addToCart/:id',authMiddleware,addToCart)
router.get('/getCart/:id',getCart)
router.delete('/deletecart/:id/:itemId',delCart)
router.post('/addtowishlist/:id', authMiddleware, addtowishlist);
router.get('/getwishlist/:id', getwish);
router.delete('/delwishlist/:id/:itemId', delwishlt);
router.post('/payment',payment)
router.get('/getpayment',getPayment)
router.get('/payHis/:userId',indpayment)
router.get("/agentpay/:agentId", agentpayment);
module.exports=router