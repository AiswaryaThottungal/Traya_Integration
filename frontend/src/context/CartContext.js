import { createContext, useContext,useEffect,useReducer } from "react";
import reducer from "../reducer/CartReducer";

const CartContext = createContext();

const getLocalCartData = () =>{
    console.log("getting LocalCart Data")
    let localCartData = localStorage.getItem("trayaCart");
    console.log(localCartData);
    debugger;
    if(localCartData !== null){
        return JSON.parse(localCartData);       
    }
    else{
        localCartData = [];
        console.log("local cart empty")
        return localCartData;
    }
}

const initialState = {
    cart: getLocalCartData(),
    total_item: "",
    total_amount:" "  

};

const CartContextProvider = ({children}) => {
    const [state,dispatch] =useReducer(reducer,initialState);
    

    //adding a product ti the cart
    const  addToCart = (id,selectedSize,quantity,product) =>{       
        console.log(selectedSize) 
        debugger;
        return dispatch({type: "ADD_TO_CART", payload: {id,selectedSize,quantity,product}});
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

    const setDecrease = (id) =>{
        return dispatch({type:"DECREASE_QUANTITY",payload:{id}})

    }
    const setIncrease = (id) =>{
        return dispatch({type:"INCREASE_QUANTITY",payload:{id}})
    }

    //adding and retrieving data to and from localstorage

    useEffect(() =>{    
        
        dispatch({ type: "CART_ITEM_PRICE_TOTAL" });       
        localStorage.setItem("trayaCart",JSON.stringify(state.cart))
    },[state.cart]);
  
    return <CartContext.Provider value={{...state,addToCart,removeItem, clearCart,setDecrease,setIncrease}}>{children}</CartContext.Provider>
}

const useCartContext = () =>{
    return useContext(CartContext);
}

export {CartContextProvider, useCartContext};