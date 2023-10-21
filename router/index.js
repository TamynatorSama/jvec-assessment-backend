const express = require('express')
const router = express.Router()
const contactRouter = require('./contact_router')
const authRouter = require('./auth_router')
const verifyJwt = require('../middleware/verify_jwt')
const {ErrorResponse} = require('../helper_class/json_response_class')


router.use('/auth',authRouter)
router.use('/contact',verifyJwt,contactRouter)
router.all('/*',(req,res)=>{
    res.status(404).json(new ErrorResponse({message:"Route not found",statusCode:400}))
})


module.exports = router