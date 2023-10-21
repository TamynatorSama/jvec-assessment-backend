const contactModel = require('../model/contact_model')
const { SuccessResponse, ErrorResponse } = require('../helper_class/json_response_class')
const { ObjectId } = require("mongodb")

exports.createContact = async (req, res) => {

    // getting needed fields form the request body
    const { first_name, last_name, phone_number, twitter, facebook, email } = req.body

    //VALIDATING NECESSARY FIELDS
    if (!first_name || !last_name, !phone_number) {

        let firstNameVal = !first_name ? [
            "First Name field is required"
        ] : undefined
        let lastNameVal = !last_name ? [
            "Last Name field is required"
        ] : undefined
        let phoneVal = !phone_number ? [
            "Last Name field is required"
        ] : undefined

        return res.status(400).json(
            new ErrorResponse({
                message: "Validation Error",
                statusCode: 400,
                error: {
                    first_name: firstNameVal,
                    last_name: lastNameVal,
                    phone_number: phoneVal
                }
            })
        )
    }

    let newContact = contactModel({
        first_name,
        last_name,
        phone_number,
        email, twitter, facebook,
        user_id: req.user_id
    })
    let createdContact = await newContact.save();



    res.status(201).send(new SuccessResponse({
        message: "Contact Created Successfully",
        statusCode: 201,
        result: createdContact
    }))
}
exports.allContact = async (req, res) => {
    let contactList = await contactModel.find({ "user_id": req.user_id }).exec()
    res.status(200).send(new SuccessResponse({
        message: "Contacts Retrieved Successfully",
        statusCode: 200,
        result: contactList
    }))
}
exports.singleContact = async(req, res) => {
    let contactId = req.params.id;
    let contactList = await contactModel.find({ "user_id": req.user_id ,"_id":contactId}).exec()
    return res.status(200).send(new SuccessResponse({
        message: "Contacts Retrieved Successfully",
        statusCode: 200,
        result: contactList
    }))
}
exports.updateContact = (req, res) => { }
exports.deleteContact = (req, res) => { }