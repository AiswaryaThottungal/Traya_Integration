const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async(req,res) => {
    try{
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }catch(error){
        throw new Error(error);
    }
});

const getaProduct = asyncHandler(async(req,res) => {    
    const{ id } =req.params;
    try{
        const findProduct = await Product.findById(id);
        res.json({findProduct});
    }catch(error){
        throw new Error(error);
    }
});

const getAllProducts = async(req,res) => {
    const {name,category,fabric,featured,sort,select} = req.query;
    const queryObject = {};

    if(name){    
        queryObject.name = {$regex: name, $options: "i"};
    }
    if(category){    
        queryObject.category = {$regex: category, $options: "i"};
    }
    if(fabric){    
        queryObject.fabric = {$regex: fabric, $options: "i"};
    }
    if(featured){    
        queryObject.featured = featured;
    }

    let apiData = Product.find(queryObject);

    if(sort){
        let sortAttributes = sort.split(",").join(" ");
        apiData = apiData.sort(sortAttributes);
    }

    if(select){
        let selectAttributes = select.split(",").join(" ");
        apiData = apiData.select(selectAttributes);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    console.log("limit:"+limit)

    let skip =(page-1)*limit;

    apiData = apiData.skip(skip).limit()

    console.log(queryObject)

    const Products = await apiData;
    res.status(200).json({Products, nbHits:Products.length});
}

const updateProduct = asyncHandler(async(req,res) => {
    const {id} = req.params;      
    try{        
        const updatedProduct = await Product.findByIdAndUpdate(id,req.body, {
            new :true
        });
        res.json(updatedProduct);
    }catch(error){
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async(req,res) => {
    const {id} = req.params;      
    try{        
        const deletedProduct = await Product.findByIdAndDelete(id);            
        res.json(deletedProduct);
    }catch(error){
        throw new Error(error);
    }
})

const addToWishlist = asyncHandler(async(req,res) => {
    const {_id} = req.user;
    const { prodId } = req.body;
    try{
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishlist: prodId},
                },
                {
                    new: true,
                }
            );
            res.json(user);
        }else{
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishlist: prodId},
                },
                {
                    new: true,
                }
            );
            res.json(user);
        }
    }catch(error){
        throw new Error(error)
    }
})


module.exports = {createProduct,getaProduct,getAllProducts, updateProduct,deleteProduct,addToWishlist}