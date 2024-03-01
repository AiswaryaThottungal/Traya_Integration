const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true
        },
        lastName:{
            type: String,
            required:true
        },
        address:{
            type: String,
            required:true
        },
        city:{
            type: String,
            required:true
        },
        state:{
            type: String,
            required:true
        },
        country:{
            label:{
                type: String,
                required:true
            },
            value:{
                type: String,
                required:true
            }
            
            
        },
        phone:{
            type: String,
            required:true
        }

    },
    {
        timestamps: true,
    }
)

module.exports = Address = mongoose.model("Address", addressSchema);