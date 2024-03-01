const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({ 
         
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true
    },
    count: {
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
},
{
    timestamps: true,
}
);

module.exports  = CartItem = mongoose.model("CartItem", cartItemSchema);