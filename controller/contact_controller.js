const contactModel = require('../model/contact_model')
const { SuccessResponse, ErrorResponse } = require('../helper_class/json_response_class')
const path = require('path')

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

        return res.status(422).json(
            new ErrorResponse({
                message: "Validation Error",
                statusCode: 422,
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
    let contact = await contactModel.findOneAndDelete({ "user_id": req.user_id ,"_id":contactId})
    if(!contact)
        return res.status(404).send(new ErrorResponse({
            message: "Resource not found",
            statusCode: 404,
        }))
    return res.status(200).send(new SuccessResponse({
        message: "Resource has been deleted Successfully",
        statusCode: 200,
    }))

}

exports.contactPictureUpload = async(req,res)=>{
    let contactId = req.params.id;
    let contact = await contactModel.findOne({ "user_id": req.user_id ,"_id":contactId})
    if(!contact)
        return res.status(404).send(new ErrorResponse({
            message: "Resource not found",
            statusCode: 404,
        }))
    let fileName = req.user_id +req.files.profile_picture.name.replace(path.extname(req.files.profile_picture.name),"") +path.extname(req.files.profile_picture.name)
    const filePath = path.join(__dirname,"..",'profile',fileName)
    req.files.profile_picture.mv(filePath,(err)=>{
        if(err)return res.status(500).send(new ErrorResponse({
            message: "Failed to upload",
            statusCode: 500,
        }))
    })



    await contact.updateOne({
        "profile_picture": fileName
    })

    res.status(200).send(new SuccessResponse({
        message: "Contact Picture uploaded successfully",
        statusCode: 200,
        result: fileName
    }))

} 