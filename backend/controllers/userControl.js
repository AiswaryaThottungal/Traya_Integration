const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongoDbId = require("../utils/validateMongoDbId");
const jwt= require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// register a user
const createUser = asyncHandler (async (req, res) => {
    
     // Get the email from req.body  
    JSON.stringify(req.body); 
    const email = req.body.email;
    
  
    //With the help of email find the user exists or not  
    const findUser = await User.findOne({ email: email });
  
    if (!findUser) {  
       //if user not found then create a new user  
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
   
        //if user found then thow an error: User already exists
        throw new Error("User Already Exists");        
    }
});

//Login
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?.id);
    const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
    res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        token: generateToken(findUser?._id),
    });
  }
  else{
    throw new Error("Invalid Credentials");
  }
});

//Logout

const logout = asyncHandler(async(req,res)=>{
  const cookies = req.cookies;
  if(!cookies?.refreshToken) throw new Error("No refresh token in cookies");
  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({refreshToken});
  if(!user){
    res.clearCookie("refreshToken", {
      httpOnly :true,
      secure :true,
    });
    return res.sendStatus(204); //forbidden
  }
  await User.findOneAndUpdate({refreshToken}, {
    refreshToken :"",
  });
  res.clearCookie("refreshToken", {
    httpOnly :true,
    secure :true,
  });
  res.sendStatus(204);
});

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  });

  // Get a single user

const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const getaUser = await User.findById(id);
      res.json({
        getaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  //Delete a user
  const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      res.json({
        deletedUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  // Update a user

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;    
    validateMongoDbId(_id);   
    try {   
               
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            $set:{
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
            }                    
        },
        { 
          new: true, 
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });

//block a user
  const blockUser = asyncHandler( async( req,res) =>{
        const {id} = req.params;
        validateMongoDbId(id); 
        try{
            const block = await User.findByIdAndUpdate(
                id,
                {
                   $set:{
                    isBlocked : true,
                   } 
                },
                {
                    new: true,
                }
            );
            res.json({
                message : "User Blocked"
            });
        }catch(error){
            throw new Error(error);
        }
  });

  //unblock a user

  const unblockUser = asyncHandler( async( req,res) =>{
    const {id} = req.params;
    validateMongoDbId(id); 
    try{
        const block =await  User.findByIdAndUpdate(
            id,
            {
                $set :{
                    isBlocked : false,
                }
            },
            {
                new: true,
            }
        );
        res.json({
            message : "User Unblocked"
        });
    }catch(error){
        throw new Error(error);
    }
  });

  // handle token refresh

  const handleRefreshToken = asyncHandler(async (req, res) => {   
    const cookies = req.cookies;      
    if(!cookies.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookies.refreshToken;
    console.log(refreshToken)
    const user = await User.findOne({refreshToken});
    if(!user) throw new Error("Refresh token not present in the DB or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET,(err, decoded) =>{
      if(err || user.id!== decoded.id){
        throw new Error("There is something wrong with refresh token");
      }else{
        const accessToken = generateToken(user?._id);
        res.json({accessToken});
      }
    })
    res.json(user);
  })
  
//update password

const updatePassword = asyncHandler(async(req,res) => {
  
  const {_id} = req.user;
  const { current_password, new_password } = req.body;
  console.log(new_password);
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  console.log(user);
  if((await user.isPasswordMatched(current_password))){  
    console.log(user.password)
    user.password = new_password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  }else{
    throw new Error("Wrong Password!")
  }
})

  module.exports = {
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
  }