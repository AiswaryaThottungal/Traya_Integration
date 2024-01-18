const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const {
    createProduct,
    getaProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishlist   
} = require("../controllers/productControl");
const {authMiddleware,isAdmin} = require("../middleware/authMiddleware");

router.post("/",authMiddleware,isAdmin,bodyParser.json(),createProduct);
router.get("/:id",getaProduct);
router.put("/wishlist",authMiddleware,bodyParser.json(),addToWishlist)
router.put("/:id",authMiddleware,isAdmin,bodyParser.json(),updateProduct);
router.delete("/:id",authMiddleware,isAdmin,deleteProduct);
router.get("/",getAllProducts);
//router.route("/").get(getAllProducts);


module.exports = router;