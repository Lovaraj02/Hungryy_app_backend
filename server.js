const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const vendorRoute = require("./routes/vendorRoute");
const firmRoute = require('./routes/firmRoute');
const productRoute = require('./routes/productRoute');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Static folder to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/vendor', vendorRoute);
app.use('/firm', firmRoute);
app.use('/products', productRoute);

// MongoDb connection
dotenv.config();
mongoose.connect(process.env.Mongo_uri)
    .then(() => console.log("✅ mongoDb connected successfully..."))
    .catch((err) => console.log("❌ error while connecting to MongoDb", err));

// Server
app.listen(PORT, () => {
    console.log("server started at", PORT);
});
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Food Delivery</h1>");
});




// const express = require("express")
// const dotenv = require("dotenv")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const bodyParser = require("body-parser")
// const vendorRoute = require("./routes/vendorRoute")
// const firmRoute = require('./routes/firmRoute')
// const productRoute = require('./routes/productRoute')
// const path = require('path')
// const app = express()
// const PORT = process.env.PORT || 8000

// // Middlewares
// app.use(cors())
// app.use(bodyParser.json())

// //routes
// app.use('/vendor',vendorRoute)
// app.use('/firm',firmRoute)
// app.use('/products',productRoute)
// app.use('/uploads/',express.static('uploads'))

// // MongoDb connection
// dotenv.config()
// mongoose.connect(process.env.Mongo_uri)
//     .then(()=>{console.log("✅ mongoDb connected successfully...")})
//     .catch((err)=>{console.log("❌ error occured while connecting to the MongoDb",err)})





// // Express server
// app.listen(PORT,()=>{
//     console.log("server started at",PORT)
// })
// app.get('/',(req,res)=>{
//     res.send("<h1> welcome to Food Delivery")
// })