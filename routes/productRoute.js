
const express = require("express")
const productController = require('../controllers/productController');
// const router = require("./firmRoute");
const route = express.Router()


route.post('/add-product/:firmId',productController.addProduct);
route.get('/:firmId/products',productController.getProductByFirmId)

// route.get('/uploads/:imageName', (req, res) => {
//   const imageName = req.params.imageName;
//   res.setHeader('Content-Type', 'image/jpeg');
//   res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
// });

route.delete('/:productId',productController.deletedProductById)

module.exports = route


