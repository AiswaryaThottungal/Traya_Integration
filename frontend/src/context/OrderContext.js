
import { createContext, useContext,useEffect,useReducer, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

const userAPI = "http://localhost:5000/api/user/";
const OrderContext = createContext();
const cookies= new Cookies(); 

const initialState = {
    orderItems: [],
    orderTotal:"",
    paymentMethod :"",
    shippingAddress: "",
    billingAddress : ""    
}
const OrderContextProvider = ({children}) => {
    const [orderState, setOrderState] = useState(initialState);

    

    



    //create a new order

    const createOrder = async (orderItems,total_amount,paymentMethod,shipAddressId,billAddressId) =>{  
        const order = {
            orderItems,
            orderTotal : total_amount,
            paymentMethod,
            shipAddressId,
            billAddressId
        }
        console.log(order)
        try{
            const response = await axios.post(userAPI.concat('order'),
                            order,
                            {
                                headers:{
                                    "Authorization" : `Bearer ${cookies.get('accessToken')}`
                                }
                            })
                         
            
            return(response.data)
        }catch(error){
            console.log(error)
            return error.response;
            
        }    
    }

    
   

    return <OrderContext.Provider value={{...orderState,createOrder}}>{children}</OrderContext.Provider>

}
const useOrderContext = () =>{
    return useContext(OrderContext);
}

export {OrderContextProvider, useOrderContext};