require("dotenv").config();
const connectDB = require("./config/dbConnect");
const Product = require("./models/productModel");

const productJson = require("./product.json");

const start =async() => {
    try{
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(productJson);
        console.log("success");
    }catch(error){
        console.log(error);
    }
};

start();