const express = require('express')
const contactRouter = express.Router()

const {allContact,singleContact,createContact,deleteContact,updateContact} = require('../controller/contact_controller')


contactRouter.route('/').get(allContact).post(createContact)
contactRouter.route('/:id').get(singleContact).delete(deleteContact).patch(updateContact)



module.exports = contactRouter