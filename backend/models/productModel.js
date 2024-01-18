const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },   
    category: {
        type: String,
        enum: {
            values: ["Kids", "Women"],
            message: `{VALUE} is not supported`
        }
    },
    fabric: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"],
    },  
    sizeAvailable: [{
        size: {
            type: String,
            enum: {
                values: ["0-3M","3-6M","6-12M","1-2Y","2-3Y","3-4Y","4-5Y","5-6Y","6-7Y","7-8Y","S","M","L","XL"],
                message: `{VALUE} is not supported`
            },
            
        },
        quantity: {
            type: Number,
            
        }
    }],
    images: [{
        id:{
            type:String,
            required : true,
        },
        src: {
            type: String,
            required: true,
        }
    }],  
    featured:{
        type: Boolean,
        default: false,
    },
    stock: {
        type: Number,
        required: true,
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);