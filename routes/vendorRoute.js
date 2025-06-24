const express = require("express")
const route = express.Router()
const vendorController = require("../controllers/vendorController")

route.post('/register',vendorController.vendorRigistration)
route.post('/login',vendorController.vendorLogin)
route.get('/getAll',vendorController.getAll)
route.get('/getSingle/:id',vendorController.singleRecord)

module.exports = route