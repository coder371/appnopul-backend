const { verify } = require("jsonwebtoken");
const { promisify } = require("util");
const verifyToken = promisify(verify);
module.exports = async (token) => {
  try {
    return await verifyToken(token, process.env.JWT_SECRET);
  }catch(err) {
    return false;
  }
}

