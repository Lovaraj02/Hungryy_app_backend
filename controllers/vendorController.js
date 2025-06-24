const Vendor = require("../models/Vendor")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


const  vendorRigistration = async (req,res)=>{
    try {
        const {username, email, password} = req.body
        const vendorEmail = await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(201).json({message:"Email alreadt taken"})
        }
        const hashedPassword = await bcrypt.hash(password,12)

        const newVendor = new Vendor({
        username,
        email,
        password:hashedPassword
    });
    await newVendor.save()
    res.status(201).json({message:"Vendor registered successfully"})
    }
    catch (error) {
        console.log("error is",error)
        res.status(501).json({message:"server error"})
    }
}

//vendor login
dotenv.config()
const secretKey = process.env.whatIsYourName;
const vendorLogin = async (req,res)=>{
    try {
        const {email,password} = req.body
        const vendor = await Vendor.findOne({email})
        
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({message:"invalid Email or Password"})
        }
        const token = jwt.sign({vendorId: vendor._id},secretKey,{expiresIn:'1h'})
        res.status(201).json({message:"login successfull"})
        console.log(email,token)
        
    } catch (error) {
        console.log("error is",error)
        res.status(501).json({message:"server error"})
    }
    
}

//get all records
const getAll = async(req,res)=>{
    try {
        const vendorDetails = await Vendor.find().populate('firm')
        // if(!vendorDetails){
        //     return res.status(404).json({mess:"record not found"})
        // }
        res.status(201).json(vendorDetails)
    } catch (error) {
        console.log("error is",error)
        res.status(501).json({mess:"server error"})
    }
}


//get single record

const singleRecord = async (req,res)=>{
    try {
        
        const vendor = await Vendor.findById(req.params.id).populate('firm')
        if(!vendor){
            return res.status(404).json({mess:"id not found"})
        }
         res.status(201).json(vendor)

    } catch (error) {
        console.log("error is",error)
        res.status(501).json({mess:"server error"})
    }
}



module.exports = { vendorRigistration, vendorLogin, getAll, singleRecord }