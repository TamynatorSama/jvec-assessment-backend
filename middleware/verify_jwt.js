require('dotenv').config()
const jwt = require('jsonwebtoken')
const tokenBlack = require('../model/token_blacklist')
const { ErrorResponse } = require('../helper_class/json_response_class')


const verifyJWT = async (req, res, nxt) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(401).json(
            new ErrorResponse({
                message: "Unauthorized access",
                statusCode: 401,
            })
        )
    const jwtToken = authHeader.split(' ')[1]

    const blackList = await tokenBlack.findOne({ "user_id": req.user_id, "token": authHeader})
    if (blackList) {
        if (!authHeader)
            return res.status(401).json(
                new ErrorResponse({
                    message: "Unauthorized access",
                    statusCode: 401,
                })
            )
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json(
                new ErrorResponse({
                    message: "Forbidden",
                    statusCode: 403,
                }))
        req.user_id = decoded.user_id
        nxt()
    })
}

module.exports = verifyJWT