const {createContact} = require('../controller/contact_controller')
module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1)
    console.log(`${baseUrl}customer`)
    switch (req.url) {
        case `${baseUrl}customer`:
            
            createContact(req, res)
            break
        default:
            console.log("asdasd")
            res.send(
                {
                    statusCode: 404,
                    body: {
                        "status": "failure",
                        "status_code": 400,
                        "message": "resource not found"
                    }
                }
            )


    }
}