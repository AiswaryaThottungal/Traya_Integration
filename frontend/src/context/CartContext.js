import { createContext, useContext,useEffect,useReducer, useState } from "react";
import reducer from "../reducer/CartReducer";
import axios from "axios";
import {toast, Toaster} from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useAuth } from "./AuthContext";
import { useProductContext } from "./ProductContext";

const userAPI = "http://localhost:5000/api/user/";

axios.defaults.withCredentials = true;

const CartContext = createContext();

const getLocalCartData = () =>{
    
       
   console.log("getting LocalCart Data")
    let localCartData = localStorage.getItem("localCart");
    console.log(localCartData);
    debugger;
    if(localCartData !== null){
        return localCartData;       
    }
    else{
        localCartData = [];
        console.log("local cart empty")
        return localCartData;
    } 
} 

const initialState = {
    cart: [],
    total_item: "",
    total_amount:" "   

};

debugger;
const CartContextProvider = ({children}) => {
    const [state,dispatch] =useReducer(reducer,initialState);
    //const [cartState, setCartState] = useState(initialState);
   // console.log(cartState.cart)
    const cookies= new Cookies();
    const {getSingleProduct } = useProductContext();

    //adding  product to database
    const  addCartToDB = async (id,selectedSize,quantity,product) =>{                
        for(let item of state.cart){
            const cartItem = {
                productId : item.productId,
                size : item.size,
                quantity: item.quantity
            };
            debugger;
            console.log(cartItem)
            try{
                const response = await axios.post(userAPI.concat('cart'),
                                cartItem,
                                {
                                    headers:{
                                        "Authorization" : `Bearer ${cookies.get('accessToken')}`
                                    }
                                })
                
                    
                console.log(response)
            }catch(error){
                console.log(error)
                
            }

        }
        return(" Cart added to DB")
    }

    // get the cart for the user from database
    const getUserCart = async() => {     
        try{
            const response = await axios.get(userAPI.concat('cart'),
                    {
                        headers:{
                            "Authorization" : `Bearer ${cookies.get('accessToken')}`
                        }
                    })
                    .then(data => {return data} )
        const cartData = await response.data;          
        if(cartData){
            return dispatch({type: "GET_CART_FROM_DB", payload: {cartData}})
        }else{
            return null;
        }

        }catch(error){
            throw new Error(error)
        }
        
        
       
    }
    const checkStock = (id) => {
       let cartItem = state.cart.find((currentItem)=> currentItem.id === id);
       return cartItem.stock;
    }
    //adding a product to the cart
    const  addToCart = (selectedSize,quantity,product) =>{        
        debugger;
        return dispatch({type: "ADD_TO_CART", payload: {selectedSize,quantity,product}});
    }

    //remove an item from the cart
    const removeItem = (id) => {
        console.log("🚀 ~ file: CartContext.js:21 ~ removeItem ~ id:", id)
        return dispatch({type: "REMOVE_ITEM", payload:{id}});
    }

    //clear the cart
    const clearCart=() => {        
        return dispatch({type:"CLEAR_CART"});  
    }

    const setDecrease = async(id) =>{
        
        return dispatch({type:"DECREASE_QUANTITY",payload:{id}})

    }
    const setIncrease = async(id) =>{
        
        
       return dispatch({type:"INCREASE_QUANTITY",payload:{id}}) 
    }
    

    //adding and retrieving data to and from localstorage

    useEffect(() =>{    
        dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
        //localStorage.setItem("localCart",JSON.stringify(state.cart))
        console.log(state.cart)
    },[state.cart]);
  
    return <CartContext.Provider value={{...state,addToCart,getUserCart,removeItem, clearCart,setDecrease,setIncrease,checkStock,addCartToDB}}>{children}</CartContext.Provider>
}

const useCartContext = () =>{
    return useContext(CartContext);
}

export {CartContextProvider, useCartContext};