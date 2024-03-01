const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
                ref:"User"
    },
    cartItems: [
        {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true
        },
        quantity: {
            type: Number,
            required : true
        },
        size: {
            type:String,
            required:true
        },
        price: {
            type: Number,
            required: true
        }   
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number, 
    orderby :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
{
    timestamps: true,
}
);

module.exports  = Cart = mongoose.model("Cart", cartSchema);