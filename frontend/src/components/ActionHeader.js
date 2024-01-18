import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useCartContext } from "../context/CartContext";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {toast, Toaster} from 'react-hot-toast';


const ActionHeader = () => {
    const [dashboard, setDashboard] = useState(false);  
  const {total_item} =useCartContext();

  const { authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn} = useAuth();

/* const handleLogin = (e) =>{
    e.preventDefault();
    setIsLoggedIn(true);
    setAuthUser({
        Name: "Aiswarya"
    })
} */

const handleLogout= async() =>{
    
    try{
        const response = await axios.get("http://localhost:5000/api/user/logout");   

        console.log(response.data)        
        toast.success("User Logged Out");
        setIsLoggedIn(false);
        setAuthUser(null);
    }catch(error){
        console.log(error.response.data)
        toast.error(error.response.data.message)
    }
    
}

    return (
        <ActionNav>
            
            <div className="offer-info">
            <h3 className="shipping-offer">FREE shipping all over India!</h3>
            </div>

            <div className="action-bar">
            <ul className="action-list">
       
                <li>
                    <NavLink to="/cart" className="action-link cart--link">
                    <FiShoppingCart className="cart-icon" />
                    {total_item === 0 ?
                        <span>Cart</span>
                    :
                    <span className="cart-total--item"> {total_item} </span>
                    }
                    
                    </NavLink>
                </li>   
                <li >
                    <div className="dashboard-menu">
                        <button className="dropdown-button">
                            <FiUser className="action-link"
                            
                            /> 
                        </button>
                        <ul className='dashboard-items'>
                            <li >
                                {isLoggedIn ? 
                                    <button id='logout-btn' className="dashboard-link"
                                        onClick={handleLogout} >                                   
                                        
                                            Log Out
                                    </button>                  
                                
                                :    
                                    <NavLink className="dashboard-link"
                                        to="/login">                              
                                        
                                            Log In
                                    </NavLink> 
                                }           
                            </li>
                            <li >
                                <NavLink className="dashboard-link"
                                    to="/profile " >                               
                                   
                                        Profile
                                </NavLink> 
                            </li>
                            <li >
                                <NavLink className="dashboard-link"
                                    to="/cart"  >                            
                                    
                                        Cart
                                </NavLink> 
                            </li>
                        </ul>
                    </div>
                             
                    
                </li>     
            </ul>

            </div>
            
        </ActionNav>
    );
}


const ActionNav = styled.nav`
width:100%;
display:flex;
justify-content: space-between;
position:relative;
.offer-info {
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top:0.5rem;  
    color: ${({ theme }) => theme.colors.white};  
    font-size:2.5 rem;
    
}
.action-bar {
     
    width:20%; 
    position:absolute;
    right:0;
    margin-top:0.5rem; 
    display: flex;
    justify-content:center;
    align-items:center;
    .action-list {
        display:flex;
        gap: 4.8rem;
        align-items: center;           
        list-style-type:none; 
        .action-link {
            position:relative;           
            margin-right:2 rem;           
            font-size: 3.2rem;
            color: ${({ theme }) => theme.colors.white};            
            &:link,
            &:visited {
              display: inline-block;
              text-decoration: none;
              font-size: 1.8rem;
              font-weight: 500;
              text-transform: uppercase;
              
              transition: color 0.3s linear;
              
            }
    
            &:hover,
            &:active {
              color: ${({ theme }) => theme.colors.helper};
            }
        }

        .dropdown-button {
            background-color: ${({ theme }) => theme.colors.secondary};
            color: white;           
            font-size: 16px;
            border: none;
          }
        .dashboard-menu{
            position: relative;
            display: inline-block;
        }
        .dashboard-items {
            display: none;
            position: absolute;
            background-color: ${({ theme }) => theme.colors.bg};
            min-width: 160px;
            // box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }
        .dashboard-link {
            padding: 12px 16px;
            text-decoration: none;           
            font-size: 2rem; 
            display: block;
            &:link,
            &:visited {
                color: ${({ theme }) => theme.colors.black};
                
            }
            &:hover,           
            &:active {                   
                color: ${({ theme }) => theme.colors.helper};
            }
        }
        #logout-btn{
            background-color: ${({ theme }) => theme.colors.bg};
            border:none;
            
            &:visited {
                color: ${({ theme }) => theme.colors.black};
                
            }
            &:hover,
            &:active {                   
                color: ${({ theme }) => theme.colors.helper};
            }

        }
        .dashboard-items a:hover {background-color: ${({ theme }) => theme.colors.bg} ;}

        .dashboard-menu:hover .dashboard-items {display: block;}

       
       /*  #dashboard-items {
            display:none;

        }
         .dashboard-link {
            font-size: 2rem;            
            padding: 1rem;
        
        } 
        #dashboard-menu:hover #dashboard-items {
            background-color: ${({ theme }) => theme.colors.bg};
            display : block;
            position:absolute;
            top: 4.5rem;
            z-index:1000;
            padding: 0rem 2rem;           
           
        } */
       
          .cart--link {
            position: relative;
    
            .cart-icon {
              position: relative;
              font-size: 3.2rem;
            }
    
            .cart-total--item {
              width: 4.2rem;
              height: 4.2rem;
              font-size: 2rem;
            }
          }
    
    } 
}

`;

export default ActionHeader;