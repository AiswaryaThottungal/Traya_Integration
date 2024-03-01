const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
                ref:"User"
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
    ],
    orderTotal: {
        type:Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: "creditCard",
        enum: [
            "creditCard",
            "debitCard",
            "bankTransfer",
            "googlePay",
            "COD"
        ]
    },
    shippingAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required: true
    },
    billingAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required: true
    },
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered"
        ]
    },
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);