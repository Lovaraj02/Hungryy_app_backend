const Firm = require('../models/Firm')
const Vendor = require("../models/Vendor")
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

const addFirm = async (req,res)=>{
    try {
        const {firmName,area,category,region,offer} = req.body
        const image = req.file ? req.file.filename: null;
        const vendor = await Vendor.findById(req.vendorId)
        if(!vendor){
            return res.status(404).json({mess:"not found vendor"})
        }
        const firm = new Firm({firmName,area,category,region,offer,image, vendor:vendor.id})
        const savedFirm = await firm.save()
        const firmId = savedFirm._id;
        vendor.firm.push(savedFirm)
        await vendor.save()
        res.status(201).json({mess:"firm added successfully",firmId})
    } 


    catch (error) {
        console.log("error is",error)
        res.status(501).json({mess:"server error"})
    }
    
}

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deletedFirm = await Firm.findByIdAndDelete(firmId);

    if (!deletedFirm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    res.status(200).json({ message: "Firm deleted successfully", deletedFirm });
  } catch (error) {
    res.status(500).json({ message: "Error deleting firm", error });
  }
};



module.exports = {addFirm:[upload.single('image'),addFirm], deleteFirmById}