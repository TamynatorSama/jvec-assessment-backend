const express = require('express')
const contactRouter = express.Router()
const fileUpload = require('express-fileupload')
const {uploadFileValidator} = require('../middleware/upload_file_validator')

const {allContact,singleContact,createContact,deleteContact,updateContact,contactPictureUpload} = require('../controller/contact_controller')

contactRouter.route('/').get(allContact).post(createContact)
contactRouter.route('/:id').get(singleContact).delete(deleteContact).put(updateContact).patch(fileUpload({createParentPath:true}),uploadFileValidator,contactPictureUpload)




module.exports = contactRouter