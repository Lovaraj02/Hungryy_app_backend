const Vendor = require("../models/Vendor")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const secretKey = process.env.whatIsYourName
const verifyToken = async (req,res,next)=>{
    try {
        // const token = req.headers.body
        const token = req.headers['authorization'] || req.headers['token'];

        const decoded = jwt.verify(token,secretKey)
        const vendor = await Vendor.findById(decoded.vendorId)
        if(!vendor){
            return res.status(401).json({mess:"invalid token"})
        }
        req.vendorId = vendor._id
        next()
    } catch (error) {
        console.log("error is",error)
        res.status(501).json({mess:"server error"})
    } 
}

module.exports = {verifyToken}