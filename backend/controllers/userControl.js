const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Address = require("../models/addressModel");
const Order = require("../models/orderModel");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongoDbId = require("../utils/validateMongoDbId");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
let mongoose = require("mongoose");


// register a user
const createUser = asyncHandler(async (req, res) => {

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
    const accessToken = generateToken(findUser?._id);
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
    res.cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      address: findUser?.address,
      wishlist: findUser?.wishlist,
      token: accessToken,
    });
  }
  else {
    throw new Error("Invalid Credentials");
  }
});

//Logout

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) throw new Error("No refresh token in cookies");
  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie("accessToken");
    return res.sendStatus(204); //forbidden
  }
  await User.findOneAndUpdate({ refreshToken }, {
    refreshToken: "",
    accessToken: ""
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.clearCookie("accessToken");
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
        $set: {
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

//Get the user details for the logged-in user
const getLoggedInUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const loggedInUser = await User.findById(_id);
    console.log("get logged in user")
    console.log(loggedInUser)
    res.json({
      loggedInUser,
    });
  } catch (error) {
    throw new Error(error);
  }
})

//block a user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          isBlocked: true,
        }
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Blocked"
    });
  } catch (error) {
    throw new Error(error);
  }
});

//unblock a user

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          isBlocked: false,
        }
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Unblocked"
    });
  } catch (error) {
    throw new Error(error);
  }
});

// handle token refresh

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Refresh token not present in the DB or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    } else {
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    }
  })
  res.json(user);
})

//update password

const updatePassword = asyncHandler(async (req, res) => {

  const { _id } = req.user;
  const { current_password, new_password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if ((await user.isPasswordMatched(current_password))) {
    user.password = new_password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    throw new Error("Wrong Password!")
  }
})

//save user address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const { addressId } = req.body;
  console.log("saving address")
  console.log(mongoose.Types.ObjectId.isValid(addressId))
  console.log(addressId)
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.address.find((id) => id.toString() === addressId);
    if (alreadyAdded) {
      res.json(user)
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { address: addressId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }

  } catch (error) {
    throw new Error(error);
  }
})

//get wishlist for a user
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
})

const calculateCartTotal = (cartItems) => {
  let cartTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cartTotal = cartTotal + cartItems[i].price * cartItems[i].quantity;
  }
  return cartTotal;
}


// add a product to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, size, quantity } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  let cartItems = [];
  let cartTotal = 0;
  let stock;
  let sizeIndex;
  try {
    //get the product stock

    const product = await Product.findById(productId);
    let prodSizes = product.sizeAvailable;
    for (let i = 0; i < prodSizes.length; i++) {
      if (prodSizes[i].size === size) {
        stock = prodSizes[i].quantity;
        sizeIndex = i;
      }
    }
    if (quantity > stock) {
      throw new Error("Stock less than the entered quantity!")
    }
    selectedSize = prodSizes.splice(sizeIndex, 1)[0];

    // check if user already has products in cart
    const productExist = await Cart.find({ userId: _id }).populate(cartItems.product);
    let productInCart = await Promise.all(productExist)
    //if products exist in cart already
    if (productInCart.length != 0) {

      let cartItems = productInCart[0].cartItems;

      //check if the entered product - size combination exists in the cart already, if yes update the quantity, else create a new item
      let existingIndex = cartItems.findIndex((currentItem) => (currentItem.product.toString() === productId && currentItem.size === size));

      if (existingIndex >= 0) {
        let existingProduct = cartItems.splice(existingIndex, 1);
        let updatedItem = existingProduct[0];
        updatedItem.quantity = updatedItem.quantity + quantity;
        cartItems.push(updatedItem);
      }
      else {
        let newItem = {};
        newItem.product = productId;
        newItem.quantity = quantity;
        newItem.size = size;
        //let getPrice = await Product.findById(productId).select("price").exec();
        newItem.price = product.price;
        cartItems.push(newItem);
      }
      //calculate total price of cart items
      cartTotal = 0;
      for (let i = 0; i < cartItems.length; i++) {
        cartTotal = cartTotal + cartItems[i].price * cartItems[i].quantity;
      }

      let updatedCart = await Cart.findOneAndUpdate({ userId: _id },
        {
          $set: {
            cartItems: cartItems,
            cartTotal: cartTotal
          }
        },
        {
          new: true,
        }
      );


      res.json(updatedCart)
    }
    // if cart is empty initially create a new cart
    else {
      let newItem = {};
      newItem.product = productId;
      newItem.quantity = quantity;
      newItem.size = size;
      //let getPrice = await Product.findById(productId).select("price").exec();
      newItem.price = product.price;
      cartItems.push(newItem);
      cartTotal = 0;
      for (let i = 0; i < cartItems.length; i++) {
        cartTotal = cartTotal + cartItems[i].price * cartItems[i].quantity;
      }
      let newCart = await new Cart({
        userId: _id,
        cartItems,
        cartTotal,
        orderby: _id
      }).save();
      // update the stock in the product after the new item is added to cart
      /* if (newCart) {
        selectedSize.quantity = selectedSize.quantity - quantity;
        prodSizes.push(selectedSize);
        let updatedProduct = await Product.findByIdAndUpdate(productId,
          {
            $set: {
              sizeAvailable: prodSizes
            }
          },
          {
            new: true
          }
        )
      } */
      res.json(newCart)
    }
  } catch (error) {
    throw new Error(error)
  }

})


const removeCartItem = asyncHandler(async (req, res) => {
  const { productId, size } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id });

    if (cart) {
      let cartItems = cart[0].cartItems;
      let itemIndex = cartItems.findIndex((currentItem) => (currentItem.product.toString() === productId && currentItem.size === size));
      if (itemIndex >= 0) {
        let removedItem = cartItems.splice(itemIndex, 1);
        let quantity = removedItem[0].quantity;
        let cartTotal = calculateCartTotal(cartItems);
        let updatedCart = await Cart.findOneAndUpdate({ userId: _id },
          {
            $set: {
              cartItems: cartItems,
              cartTotal: cartTotal
            }
          },
          {
            new: true,
          }
        );



      } else {
        throw new Error("Could not remove item")
      }
    }
  } catch (error) {

  }

})

// get the user's cart from DB
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ userId: _id }).populate("cartItems.product", "_id name price images sizeAvailable");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
})

// empty the cart
const clearCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
})

//prepare the order on checkout
const prepareOrder = asyncHandler(async (req, res) => {
  const { orderItems, orderTotal, paymentMethod, shipAddressId, billAddressId } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    let newOrder = await new Order({
      userId: _id,
      orderItems: orderItems,
      orderTotal,
      paymentMethod,
      shippingAddress: shipAddressId,
      billingAddress: billAddressId,
      orderby: _id
    }).save();

    // update the stock in the product after the new order is placed
    if (newOrder) {
      let sizeIndex;
      for (let i = 0; i < orderItems.length; i++) {
        const product = await Product.findById(orderItems[i].product);
        const productSizes = await product.sizeAvailable;

        for (let j = 0; j < productSizes.length; j++) {
          if (productSizes[j].size === orderItems[i].size) {
            sizeIndex = j;
            break;
          }
        }
        let selectedSize = productSizes.splice(sizeIndex, 1)[0];
        selectedSize.quantity = selectedSize.quantity - orderItems[i].quantity;
        if (selectedSize.quantity > 0) {
          productSizes.push(selectedSize)
        }

        let updatedProduct = await Product.findByIdAndUpdate(orderItems[i].product,
          {
            $set: {
              sizeAvailable: productSizes
            }
          },
          {
            new: true
          }
        )


      }

    }
    res.json(newOrder)
  } catch (error) {
    throw new Error(error);
  }
})

const createAddress = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, city, state, country, phone } = req.body;
  const { _id } = req.user;

  validateMongoDbId(_id);
  try {
    const user = await User.findById(_id);
    const userAddress = await user.address;

    console.log(userAddress)
    for (let i = 0; i < userAddress.length; i++) {     
      const addressData = await Address.findById(userAddress[i]);
      const currentAddress = await addressData;      
      
      if (currentAddress.firstName === firstName && 
        currentAddress.lastName === lastName && 
        currentAddress.address === address && 
        currentAddress.city === city && 
        currentAddress.state === state && 
        currentAddress.phone === phone) {         
          
          res.json(currentAddress)
      }
    }
    let newAddress = await new Address({
      firstName,
      lastName,
      address,
      city,
      state,
      country,
      phone
    }).save();   
    res.json(newAddress)
  } catch (error) {
    throw new Error(error);
  }

})


const getSingleAddress = asyncHandler(async (req, res) => {
  const {id} = req.params;  
  try {
    const address = await Address.findById(id);   
    console.log("fetch address")  
    console.log(address)
    res.json(address)
  } catch (error) {
    throw new Error(error);
  }
})


const deleteAddress = asyncHandler(async (req, res) => {
  const {id} = req.params;  
  const { _id } = req.user;
  let deleteIndex;
  try {
    const address = await Address.findByIdAndDelete(id);   
    console.log("delete address")  
    console.log(address)
    const user = await User.findById(_id);
    let userAddress = await user.address;
    for(let i=0;i<userAddress.length;i++){      
      if(userAddress[i].toString === id){
        console.log("REMOVE ADDRESS")
        deleteIndex= i;
        break;
      }
    }
    let removedAddress= userAddress.splice(deleteIndex, 1);
    console.log(userAddress)
    const updatedUser = await User.findByIdAndUpdate(_id,
      {
        $set: {
          address: userAddress,
          
        }
      },
      {
        new: true,
      })
    res.json(updatedUser)
  } catch (error) {
    throw new Error(error);
  }
})




module.exports = {
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
}