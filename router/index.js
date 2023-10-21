const express = require('express')
const router = express.Router()
const contactRouter = require('./contact_router')
const {ErrorResponse} = require('../helper_class/json_response_class')


router.use('/contact',contactRouter)
router.all('/*',(req,res)=>{
    res.status(404).json(new ErrorResponse({message:"Route not found",statusCode:400}).toJson())
})


module.exports = router