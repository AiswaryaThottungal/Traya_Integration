const bodyParser = require("body-parser");
const cookieParser= require("cookie-parser");
const express = require("express");
const router = express.Router();
const {
    createUser, 
    loginUserCtrl,
    getAllUsers,
    getaUser,
    deleteUser,
    updateUser,
    getLoggedInUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    saveAddress,
    getWishlist,    
    getUserCart,
    addToCart,
    clearCart,
    removeCartItem,
    prepareOrder,  
    createAddress,
    getSingleAddress,
    deleteAddress
} = require("../controllers/userControl");

const {authMiddleware,isAdmin} = require("../middleware/authMiddleware");

router.post("/register", bodyParser.json(),createUser);
router.put("/password",authMiddleware,bodyParser.json(),updatePassword);
router.post("/login",bodyParser.json(),loginUserCtrl);

router.post("/cart",authMiddleware,bodyParser.json(),addToCart)
router.put("/remove-cart-item", authMiddleware,bodyParser.json(),removeCartItem )
router.get("/cart",authMiddleware,getUserCart)
router.delete("/clear-cart",authMiddleware,clearCart)

router.post("/order",authMiddleware,bodyParser.json(),prepareOrder)

router.get("/all-users", getAllUsers);
router.get("/logout",cookieParser(),logout);
router.get("/refresh",cookieParser(),handleRefreshToken);
router.get("/wishlist",authMiddleware,getWishlist);


router.get("/user-details", authMiddleware,getLoggedInUser);
router.delete("/:id", deleteUser);

router.put("/edit-user",authMiddleware,bodyParser.json(),updateUser);
router.post("/address",authMiddleware,bodyParser.json(),createAddress);
router.put("/save-address",authMiddleware,bodyParser.json(),saveAddress);
router.get("/address/:id",getSingleAddress);
router.delete("/address/:id",authMiddleware,deleteAddress);


router.get("/:id", authMiddleware, isAdmin,getaUser);
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser);
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser);

module.exports = router;  