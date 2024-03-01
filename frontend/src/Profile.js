import React, { useState,useEffect } from 'react';
import { Button } from './styles/Button';
import styled from 'styled-components';
import { useAuth } from './context/AuthContext';
import AddressCard from './components/AddressCard';
import { FiPlusSquare, FiLock } from "react-icons/fi";
import AddAddress from './components/AddAddress';
import ChangePassword from './components/ChangePassword'

const Profile = () => {
  const [addAddress, setAddAddress] = useState(false)
  const [addresses, setAddresses] = useState([])
  
  const [passwordChange, setPasswordChange] = useState(false)
  const { authUser,
    isLoggedIn
  } = useAuth();
  

  useEffect(() => {
    if(authUser.address.length!==0)
      setAddresses(authUser.address);
    else
      setAddresses([]);

  }, [authUser]);



  debugger;
  if (!isLoggedIn) {
    return (
      <Wrapper>
        <p>Please Login</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className='header-welcome'>
        <h2>My Account</h2>
        <p className='welcome-message'> Welcome {authUser.firstName}</p>
      </div>
      <div className='account-container'>

        <div className='email'>
          <h3>Account Email : </h3>
          <span>{authUser.email}</span>
        </div>
        <div className='addresses'>
          <h3>Saved Addresses :</h3>
          <div className="container grid grid-two-column">
            {
              
              addresses.map((currentItem) => {
                debugger;
                return <AddressCard addressId={currentItem} />
              })
             
            }
          </div>
          <div className='address-password-buttons'>
            <button onClick={() => setAddAddress(!addAddress)}><FiPlusSquare /> Add new address</button>
          </div>
          {addAddress ? <AddAddress handler={() => setAddAddress(!addAddress)} /> : <></>}

        </div>
        <div className='address-password-buttons'>
          <button onClick={() => setPasswordChange(!passwordChange)}> <FiLock /> Change password</button>
          {passwordChange ? <ChangePassword /> : <></>}
        </div>




      </div>


    </Wrapper>
  )
}


const Wrapper = styled.div`
      padding: 5rem;
      
      display:flex;
      flex-direction:column;
      .header-welcome{
        text-align:center;
      }
      .account-container{
        margin-left:3%;
        padding:1%;
        width:40vw;
       
        display:flex;
        flex-direction:column;
        
      }
      .email{
        margin-bottom: 3rem;
        display:flex;
        flex-direction:row;
        span{
            padding: 0 2rem;
            font-size: 1.8rem;
            color: ${({ theme }) => theme.colors.secondary};
        }
      }
      .addresses{
        margin-0;
        padding:0;
        h3{
          margin-bottom: 2rem;
        }
      }
      .address-card{
        width:25rem;
        padding: 2rem;
        background-color: ${({ theme }) => theme.colors.shading};

        font-size: 1.4rem;
        border-radius: 1rem;
        box-shadow : 0px 4px 8px ${({ theme }) => theme.colors.secondary};
        .card-button{
          margin-top: 1rem;          
          display: flex;
          gap: 2rem;
          justify-content:left;
          button{
            text-decoration: underline;
            max-width: auto;
            background-color:${({ theme }) => theme.colors.shading};
            color: ${({ theme }) => theme.colors.secondary};
            
            border: none;
            border-radius: 1rem;           
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease 0s;
            -moz-transition: all 0.3s ease 0s;
            -o-transition: all 0.3s ease 0s;

            &:hover,
            &:active {
              box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
              box-shadow: ${({ theme }) => theme.colors.shadowSupport};
              transform: scale(0.96);
            }

            a {
              text-decoration: none;
              color: rgb(255 255 255);
              font-size: 1rem;
            }
          }
        }
        

      }
      .address-password-buttons{
        margin-top:3rem;
        button{
          text-decoration: none;
            max-width: auto;
            background-color:white;
            color: ${({ theme }) => theme.colors.secondary};
            border: none;
            border-radius: 1rem;           
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            -webkit-transition: all 0.3s ease 0s;
            -moz-transition: all 0.3s ease 0s;
            -o-transition: all 0.3s ease 0s;

            &:hover,
            &:active {
              
              transform: scale(0.96);
            }
        }
      }

      p{
        font-size: x-large;
        padding: 2rem;
      }
  `;

export default Profile;
