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
exports.updateContact = async (req, res) => {
    let contactId = req.params.id;

    //checking the db for corresponding contact
    let contact = await contactModel.findOne({ "user_id": req.user_id ,"_id":contactId})
    if(!contact)
        return res.status(404).send(new ErrorResponse({
            message: "Resource not found",
            statusCode: 404,
        }))


    // getting needed fields form the request body
    const { first_name, last_name, phone_number, twitter, facebook, email } = req.body

    //VALIDATING NECESSARY FIELDS
    // if (!first_name || !last_name, !phone_number) {

    //     let firstNameVal = !first_name ? [
    //         "First Name field is required"
    //     ] : undefined
    //     let lastNameVal = !last_name ? [
    //         "Last Name field is required"
    //     ] : undefined
    //     let phoneVal = !phone_number ? [
    //         "Last Name field is required"
    //     ] : undefined

    //     return res.status(400).json(
    //         new ErrorResponse({
    //             message: "Validation Error",
    //             statusCode: 400,
    //             error: {
    //                 first_name: firstNameVal,
    //                 last_name: lastNameVal,
    //                 phone_number: phoneVal
    //             }
    //         })
    //     )
    // }

    //updating the contact info

    try{
        await contact.updateOne(
            {
                first_name,
                last_name,
                phone_number,
                email,
                facebook,
                twitter
            }
        ).exec()
        res.status(200).send(new SuccessResponse({
            message: "Contact updated Successfully",
            statusCode: 200,
        }))
    }
    catch(e){
        return res.status(500).json(
            new ErrorResponse({
                message: "An error occurred",
                statusCode: 500,
                error: e
            })
        )
    }
 }


exports.deleteContact = async (req, res) => { 
    let contactId = req.params.id;
    let contactList = await contactModel.findOneAndDelete({ "user_id": req.user_id ,"_id":contactId})
    if(!contactList)
        return res.status(404).send(new ErrorResponse({
            message: "Resource not found",
            statusCode: 404,
        }))
    return res.status(200).send(new SuccessResponse({
        message: "Resource has been deleted Successfully",
        statusCode: 200,
    }))

}