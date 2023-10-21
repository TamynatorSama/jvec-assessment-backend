const express = require('express')
const router = express.Router()
const contactRouter = require('./contact_router')


router.use('/contact',contactRouter)
// router.all('',(req,res)=>{
//     res.json({
//         "message": "route not found"
//     })
// })


module.exports = router