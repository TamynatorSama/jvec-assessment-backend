const express = require('express')
const contactRouter = express.Router()

const {allContact,createContact,deleteContact,updateContact} = require('../controller/contact_controller')


contactRouter.route('/').get(allContact).post(createContact).delete(deleteContact).patch(updateContact)



module.exports = contactRouter