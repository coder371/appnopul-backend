const jwt = require("jsonwebtoken");
const { jwtVerfy } = require("../../utilities/helpers/encryption");
const { UsersModel } = require("../../models");

module.exports = async (req,res,next) => {
    const token = req.headers['authorization'];
    const data = await jwtVerfy(token)
    if(data){
        const userData = await UsersModel.findById(data._id)
        req.user = userData
    }
    next()
}
