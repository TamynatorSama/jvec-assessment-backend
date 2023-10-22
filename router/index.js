const express = require('express')
const router = express.Router()
const contactRouter = require('./contact_router')
const authRouter = require('./auth_router')
const verifyJwt = require('../middleware/verify_jwt')
// const fileUpload = require('express-fileupload')
const {ErrorResponse} = require('../helper_class/json_response_class')
// const uploadRouter = require('./upload_router')


router.use('/auth',authRouter)
router.use('/contact',verifyJwt,contactRouter)
// router.use('/upload',fileUpload({createParentPath:true}),verifyJwt,uploadRouter)
router.all('/*',(req,res)=>{
    res.status(404).json(new ErrorResponse({message:"Route not found",statusCode:404}))
})


module.exports = router