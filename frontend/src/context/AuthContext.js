import React, {useState,useEffect,useContext, createContext} from 'react';
import Cookies from 'universal-cookie';
import axios from "axios";



const userAPI = "http://localhost:5000/api/user/";
//axios.defaults.withCredentials = true;


const AuthContext = createContext();

/* const initialState ={
    authUser: "",
    isLoggedIn :false
} */
export function useAuth(){
    return useContext(AuthContext);
}

const userInitialState = {
    userId: "",
    firstName: "",
    lastName:"",
    email:"",
    address:[],
    wishlist:[]
}
 export function AuthContextProvider(props){

     const [authUser, setAuthUser] = useState(userInitialState);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
  
    //const [loginState,setLoginState] = useState(initialState);
    const cookies= new Cookies();

    //create new address
    const createAddress = async (fullAddress) =>{    
        console.log(fullAddress)    
        debugger;
        try{
            const response = await axios.post(userAPI.concat('address'),
                            fullAddress,
                            {
                                headers:{
                                    "Authorization" : `Bearer ${cookies.get('accessToken')}`
                                }
                            })
                         
            debugger;
            console.log(response.data)
            return(response.data)
        }catch(error){
            return error.response;        
            
        }        
    }

    //save address to user table
    const saveAddress = async (address) =>{   
        const newAddress = {
            addressId: address
        }

        try{
            const response = await axios.put(userAPI.concat('save-address'),
                            newAddress,
                            {
                                headers:{
                                    "Authorization" : `Bearer ${cookies.get('accessToken')}`
                                }
                            })
                         
            
            return(response.data)
        }catch(error){
            return error.response;        
            
        }       

    }
    
    //get address
    const fetchAddress= async(address) => {       
        debugger;
        let addressData;
        try{
            const addressURL= userAPI.concat('address/').concat(address)
           
          /*   const response = axios.get(addressURL).then(function(response){
                addressData = response.data;
                console.log(addressData);
                return addressData
            })   */                       
            
            const response = await axios.get(addressURL)
            addressData = await response.data;
            return addressData;
        }catch(error){
            return error.response;        
            
        }       

    }

    const deleteAddress= async(address) => { 
        try{
            const addressURL= userAPI.concat('address/').concat(address)        
                             
            
            const response = await axios.delete(addressURL,
                {
                    headers:{
                        "Authorization" : `Bearer ${cookies.get('accessToken')}`
                    }
                }
                )
                
            const addressData = await response.data;
            return addressData;
        }catch(error){
            return error.response;        
            
        }       
    }

    const updatePassword= async(currentPassword,newPassword) => { 
        const passwords = {
            current_password: currentPassword,
            new_password : newPassword
        }
        debugger;
        try{
            const passwordURL= userAPI.concat('password')       
                             
            
            const response = await axios.put(passwordURL, passwords,
                {
                    headers:{
                        "Authorization" : `Bearer ${cookies.get('accessToken')}`
                    }
                }
                )
                
            const addressData = await response.data;
            return addressData;
        }catch(error){
            return error.response;        
            
        }       
    }
    


    
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        createAddress,
        saveAddress,
        fetchAddress,
        deleteAddress,
        updatePassword
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
 }