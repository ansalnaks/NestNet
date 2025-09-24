const express=require('express')
const router=express.Router()
const {addregister,login,subscribe,getemail, getuserdetails,getudetails}=require('../Cotroller/registercontroller')

router.post('/add',addregister)
router.post('/login',login)
router.post('/subscribe',subscribe)
router.get('/email',getemail)
router.get('/profile',getuserdetails)
router.get('/tuser',getudetails)

// router.get('/getdetails',getdata)

module.exports=router