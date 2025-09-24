const express = require('express');
const router = express.Router();
const authMiddlewareagent = require('../middleware/authmiddlewareagent');
const {addProperty,getProperty,uploads,updateProperty,deleteProperty,getsingleprop,agentRegister,agentLogin,adminApprove,pendingapp,rejectapp,getagent, getsingleagent, getAllProperty}=require('../Cotroller/admincontroller')
const authmiddlewareagentget=require('../middleware/authMiddlewareagentget')
router.post('/adminProperty',uploads.single('Image'),addProperty);
router.get('/getproperty/:agentId',getProperty)
router.get('/getproperty',getAllProperty)
router.get('/getPropertysing/:id',getsingleprop)
router.put('/updateProperty/:id', uploads.single("Image"), updateProperty);
router.delete('/deleteProperty/:id',deleteProperty)

router.post('/agentRegister',agentRegister)
router.post('/agentlogin',agentLogin)
router.put('/agentapp/:id',adminApprove)
router.get("/pending-agents",pendingapp)
router.put("/reject-agent/:id",rejectapp)
router.get("/getagent",getagent)
router.get("/singleagent",authMiddlewareagent,getsingleagent)


module.exports = router;