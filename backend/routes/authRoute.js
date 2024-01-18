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
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword
} = require("../controllers/userControl");
const {authMiddleware,isAdmin} = require("../middleware/authMiddleware")
router.post("/register", bodyParser.json(),createUser);
router.put("/password",authMiddleware,bodyParser.json(),updatePassword);
router.post("/login",bodyParser.json(),loginUserCtrl);
router.get("/all-users", getAllUsers);
router.get("/logout",cookieParser(),logout);
router.get("/refresh",cookieParser(),handleRefreshToken);
router.get("/:id", authMiddleware, isAdmin,getaUser);
router.delete("/:id", deleteUser);
router.put("/edit-user",authMiddleware,bodyParser.json(),updateUser);
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser);
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser);

module.exports = router;  