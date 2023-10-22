const mongoose = require('mongoose')

const tokenBlackList = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    access_token:{
        type:String,
        required: true,
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("TokenBlackList",tokenBlackList)