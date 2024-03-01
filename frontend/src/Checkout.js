import React, { useState, useMemo, useEffect } from 'react';
import { useCartContext } from './context/CartContext';
import styled from 'styled-components';
import { Button } from './styles/Button';
import { toast, Toaster } from 'react-hot-toast';
import { NavLink,useNavigate } from 'react-router-dom';
import FormatPrice from './helpers/FormatPrice';
import OrderItem from './components/OrderItem';
import { useAuth } from './context/AuthContext';
import { useOrderContext } from "./context/OrderContext";
import Select from 'react-select'
import countryList from 'react-select-country-list'

const Checkout = () => {
    const { cart,total_amount,clearCart } = useCartContext();
    const { createOrder} = useOrderContext();
   
    const countries = useMemo(() => countryList().getData(), [])
    const navigate = useNavigate();
    debugger;
    const { authUser,
        setAuthUser,
        isLoggedIn,
        createAddress,
        saveAddress
    } = useAuth();
    const initialAddressState = {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: ''
    }

    
    const [billing, setBilling] = useState("new");
    const [country,setCountry] = useState("");
    const [shipAddress, setShipAddress] = useState(initialAddressState);
    const [billAddress, setBillAddress] = useState(initialAddressState);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    
    const handleShipAddress = (e) => {
        const value = e.target.value;
        const trimmedValue = value.trim();
        console.log(trimmedValue)
        debugger;
        setShipAddress({ ...shipAddress, [e.target.name]: trimmedValue })
        console.log(shipAddress)

    }

    const handleBillAddress = (e) => {
        setBillAddress({ ...billAddress, [e.target.name]: e.target.value })
        console.log(billAddress)

    }

    const handleBillingOption = (e) => {

        setBilling(e.target.value);


    }
    const handlePaymentOption = (e) => {

        setPaymentMethod(e.target.value);
        debugger;


    }

   
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        // add address to DB
        let billAddressId;
        debugger;
        let address = await createAddress(shipAddress);
        const shipAddressId = address._id;
        if(billing === "new"){
            address = await createAddress(billAddress);
            billAddressId = address._id;
        }
        else{
            billAddressId = shipAddressId;
        }
        debugger;
        console.log(billAddressId)
        //save address id to User table
        let updatedUser = await saveAddress(billAddressId);
        setAuthUser(updatedUser);


        // create order
        let orderItems = cart.map((currentItem) =>{
            return{
                product: currentItem.productId,
                quantity: currentItem.quantity,
                price: currentItem.price,
                size: currentItem.size
            }
        })          
        const newOrder = await createOrder(orderItems,total_amount,paymentMethod,shipAddressId,billAddressId);
        if(newOrder){
            clearCart();
        }        
        navigate('/order')
    }

    useEffect(() => {

        if (billing === "shipping") {
            setBillAddress({ ...shipAddress })
        } else if (billing === "new") {
            setBillAddress(initialAddressState)
        }


    },[billing,shipAddress]);

    return (
        <Wrapper>
            <div className='shipping-details'>
                <div className='account-email'>
                    <h3>Account Email : </h3>
                    <span>{authUser.email} </span>
                </div>
                <p>Website under maintenance. Please do not enter any sensitive information!</p>
                <div className='shipping-address'>
                    
                    
                    <form className='shipping-form' id='shipping-form' autoComplete='on' onSubmit={handleSubmit}>

                        <div className='shipping-container'>
                        <h3>Shipping Address :</h3>
                            <div className='input-sub-container'>
                                <input className='input' label='firstName' name='firstName' placeholder='First Name' value={shipAddress.firstName} onChange={handleShipAddress} ></input>

                                <input className='input' label='lastName' name='lastName' placeholder='Last Name' value={shipAddress.lastName} onChange={handleShipAddress}></input>

                            </div>

                            <div className='input-sub-container'>
                                <input className='address' label='address' name='address' placeholder='Address' value={shipAddress.address} onChange={handleShipAddress} ></input>

                            </div>

                            <div className='input-sub-container'>
                                <input className='input' label='city' name='city' placeholder='City' value={shipAddress.city} onChange={handleShipAddress}></input>

                                <input className='input' label='state' name='state' placeholder='State' value={shipAddress.state} onChange={handleShipAddress}></input>

                            </div>
                            <div className='input-sub-container'>
                                <Select className='select' label='country' options={countries} value={shipAddress.country} onChange={(val) => { setShipAddress({ ...shipAddress, country: val}) }} />
                                <input className='input' label='phoneNumber' name='phone' placeholder='Phone No.' value={shipAddress.phone} onChange={handleShipAddress}></input>

                            </div>
                        </div>
                        <div className='billing-container'>
                            <div className='billing-option'>
                                <h3>Billing Address:</h3>
                                <div className='bill-address-option'>
                                    <label>
                                        <input type='radio' name='address-select' value='shipping' checked={billing === "shipping"} className='check-input' onChange={handleBillingOption} />
                                        Same as shipping address
                                    </label>
                                </div>
                                <div className='bill-address-option'>
                                    <label>
                                        <input type='radio' name='address-select' value='new' checked={billing === "new"} className='check-input' onChange={handleBillingOption} />
                                        Enter a new address
                                    </label>
                                </div>
                            </div>

                            <div className='billing-address'>
                                <div className='input-sub-container'>
                                    <input className='input' label='firstName' name='firstName' placeholder='First Name' value={billAddress.firstName} onChange={handleBillAddress} ></input>

                                    <input className='input' label='lastName' name='lastName' placeholder='Last Name' value={billAddress.lastName} onChange={handleBillAddress}></input>

                                </div>

                                <div className='input-sub-container'>
                                    <input className='address' label='address' name='address' placeholder='Address' value={billAddress.address} onChange={handleBillAddress} ></input>

                                </div>

                                <div className='input-sub-container'>
                                    <input className='input' label='city' name='city' placeholder='City' value={billAddress.city} onChange={handleBillAddress}></input>

                                    <input className='input' label='state' name='state' placeholder='State' value={billAddress.state} onChange={handleBillAddress}></input>

                                </div>
                                <div className='input-sub-container'>
                                    <Select className='select' label='country' options={countries} value={billAddress.country} onChange={(val) => { setBillAddress({ ...billAddress, country: val }) }} />
                                    <input className='input' label='phoneNumber' name='phone' placeholder='Phone No.' value={billAddress.phone} onChange={handleBillAddress}></input>

                                </div>
                            </div>



                        </div>
                        <div className='payment-container'>
                            <h3>Payment Method:</h3>
                            <div className='payment-method'>
                                <label>
                                    <input type='radio' name='payment-option' value="creditCard" checked={paymentMethod === "creditCard"} className='payment-option' onChange={handlePaymentOption} />
                                    Credit Card
                                </label>
                                <label>
                                    <input type='radio' name='payment-option' value="debitCard" checked={paymentMethod === "debitCard"} className='payment-option' onChange={handlePaymentOption} />
                                    Debit Card
                                </label>
                                <label>
                                    <input type='radio' name='payment-option' value="googlePay" checked={paymentMethod === "googlePay"} className='payment-option' onChange={handlePaymentOption} />
                                    Google Pay
                                </label>
                                <label>
                                    <input type='radio' name='payment-option' value="bankTransfer" checked={paymentMethod === "bankTransfer"} className='payment-option' onChange={handlePaymentOption} />
                                    Bank Transfer
                                </label>
                                <label>
                                    <input type='radio' name='payment-option' value="COD" checked={paymentMethod === "COD"} className='payment-option' onChange={handlePaymentOption} />
                                    Cash on Delivery
                                </label>

                            </div>
                        </div>

                        <Button type='submit'> Place Order</Button>


                    </form>
                </div>

            </div>


            <div className='order-details'>
                <h3>Order Details :</h3>
                <div className='order-container'>


                    <div className='cart-heading grid grid-three-column'>
                        <p>Order Items:</p>
                        <p> Quantity</p>
                        <p> Amount</p>
                    </div>
                    <hr />
                    <div className='cart-item'>
                        {
                            cart.map((currentItem) => {
                                debugger;
                                return <OrderItem key={currentItem.id} {...currentItem} />
                            })
                        }
                    </div>
                    <hr />



                    <div className='order-total--amount'>
                        <div className='order-total--subdata'>
                            <div>
                                <p>Order Total: </p>
                                <p> <FormatPrice price={total_amount} /> </p>
                            </div>

                        </div>

                    </div>


                </div>

            </div>




         




        </Wrapper>
    )
}



const Wrapper = styled.section`
    padding:  0;
    margin: 0 2rem;
    display:flex;
   
    .account-email{
        margin-bottom: 3rem;
        display:flex;
        flex-direction:row;
        span{
            padding: 0 2rem;
            font-size: 1.8rem;
            color: ${({ theme }) => theme.colors.secondary};
        }
    }
    .shipping-details{
        width:70vw;
        padding:5rem;
    }
    .shipping-form{
        width: 40vw;
        padding: 3rem ;
        
        border-style: none;        
        margin-bottom: 5%;
        margin-top: 0;
        box-shadow: 24;
        border-radius: 1em;
        text-align: left;
        align-items: center;
        justify-content: left;
        

        .input-sub-container{
           
            width :75%;
           
           padding:0;
            display: flex;
            flex-direction: row;
            justify-content:space-between;
           
            .input{
                background-color:#ffff;
                width:40%;
                border-radius: 1em;
                margin: 1.8rem;
            }
            .address{
                width:100%;
                border-radius: 1em;
                margin: 1.8rem;
            }
            .select{
                width:50%;
                border-radius: 1em;
                margin: 1.8rem;
            }
        }

        .billing-option{
            max-width:80%;
            display:flex;
            flex-direction:row;
            align-items:center;
        }
        .bill-address-option{
           
            font-size: 1.6rem;
            font-weight:100px;
            color:${({ theme }) => theme.colors.black};
            input{
                margin-left: 3rem;
            }
        }
        .payment-container{
            
            
            margin-bottom: 2rem;
            justify-content :left;

            .payment-method{
                
                margin: 0;               
                display:flex;
                flex-direction:column;
                padding:1rem;
                font-size: 1.6rem;
                font-weight:100px;
                color:${({ theme }) => theme.colors.black};
                input{
                    margin-right: 1.6rem;
                    margin-top: 1rem;
                }

            }
            
            
            
            }
        }
        
    }

    .order-details{
        padding:5rem;
        border-left:1px solid  ${({ theme }) => theme.colors.shading};
    }
    .order-container{
        margin-top:2rem; 
        max-width:50vw;
        border:1px solid grey;
       
    }
    .grid {
        display: grid;
        gap: 8rem;
      }
    .grid-three-column {
    
      grid-template-columns: repeat(3, 1fr) 0.2fr;
    }
  
   
    .cart-heading {
      text-align: center;
      text-transform: uppercase;
    }
    hr {
      margin-top: 1rem;
    }
    .cart-item {
      padding: 3.2rem 0;
      display: flex;
      flex-direction: column;
      gap: 3.2rem;
    }
  
    .cart-user--profile {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 5.4rem;
  
      img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
      }
      h2 {
        font-size: 2.4rem;
      }
    }
    
    .order-image--name {      
      align-items: center;
      display: grid;
      gap: 1rem;
      grid-template-columns: 0.4fr 1fr;
      text-transform: capitalize;
      text-align: left;
      img {
        max-width: 5rem;
        height: 5rem;
        object-fit: contain;
        color: transparent;
      }
      p{
        font-size: 15px;
      }
      .color-div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
  
        .color-style {
          width: 1.4rem;
          height: 1.4rem;
  
          border-radius: 50%;
        }
      }
    }
  
    .cart-actions-total{
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
  
      .btn-clear {
        background-color: #e74c3c;
      }
    }
    .cart-buttons {
      margin-top: 2rem;    
      display: flex;
      justify-content : flex-end;
      
  
      .btn-clear {
        background-color: #e74c3c;
      }
    }
  
       
   
  
   
  
   
    .order-total--amount {
      
      margin-left : 25rem;
      text-transform: capitalize;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  
      .order-total--subdata {
        margin-top : 0;
        
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
       
      }
      div {
        display: flex;
        gap: 3.2rem;
        justify-content: space-between;
      }
  
      div:last-child {
        background-color: #fafafa;
      }
  
      div p:last-child {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.heading};
      }
    }
  
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .grid-five-column {
        grid-template-columns: 1.5fr 1fr 0.5fr;
      }
      .cart-hide {
        display: none;
      }
  
      .cart-two-button {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        gap: 2.2rem;
      }
  
      .order-total--amount {
        width: 100%;
        text-transform: capitalize;
        justify-content: flex-start;
        align-items: flex-start;
  
        .order-total--subdata {
          width: 100%;
          border: 0.1rem solid #f0f0f0;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          padding: 3.2rem;
        }
      }
    }
  `;


export default Checkout;