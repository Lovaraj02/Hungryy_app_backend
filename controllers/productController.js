const Product = require("../models/Product")
const Firm = require("../models/Firm")
const multer = require("multer")
const firmController = require("./firmController")
//image
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{cb(null,Date.now() + '_' + file.originalname)}
})
const upload = multer({storage:storage})

const addProduct = async (req,res)=>{
    try {
        const {productName,price,category,bestSeller,description} = req.body;
        const image = req.file ? req.file.filename:null;
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({mess:"firm not found"})
        }
        const newProducts = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm:firm._id
        }) 

        const savedProducts = await newProducts.save()
        firm.product.push(savedProducts)
        await firm.save()
        res.status(201).json(savedProducts)

    }catch (error) {
        console.log("error is",error)
        res.status(501).json({mess:"server error"})
    }  
}

//getProduct by firm id

const getProductByFirmId = async (req,res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({mess:"not found record"})
        }

    const products = await Product.find({firm:firmId})
    const RestruantName = firm.firmName;
    res.status(201).json({RestruantName,products})
    } catch (error) {
        console.log("error is",error)
        res.status(501).json({mess:"server error"})
    }


}



const deletedProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};





// const deletedProductById = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const deletedProduct = await Firm.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product deleted successfully", deletedProduct });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting firm", error });
//   }
// };



module.exports = {addProduct:[upload.single('image'),addProduct], getProductByFirmId, deletedProductById}