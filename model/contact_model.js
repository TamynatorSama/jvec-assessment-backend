const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: ""
    },
    email: {
        type: String,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Contact",contactSchema)