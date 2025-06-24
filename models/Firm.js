const mongoose = require("mongoose")

const firmSchema = new mongoose.Schema({
    firmName:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:['Veg','Non-Veg']
        }]
    },
    region:{
        type:[{
            type:String,
            enum:['east','west']
        }]
    },
    offer:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }
    ],
    product:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'product'
            }
        ]
})

module.exports = mongoose.model('Firm',firmSchema)