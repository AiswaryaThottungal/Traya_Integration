import React, { useMemo, useState } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list';
import styled from 'styled-components';
import { Button } from '../styles/Button';
import { useOrderContext } from "../context/OrderContext";
import { useAuth } from '../context/AuthContext';
import { toast, Toaster } from 'react-hot-toast';



const AddAddress = (props) => {
    const countries = useMemo(() => countryList().getData(), [])    
    const { setAuthUser,createAddress, saveAddress } = useAuth();
    const initialAddressState = {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: ''
    }
    const [address, setAddress] = useState(initialAddressState);
    const handleAddress = (e) => {
        const value = e.target.value;
        const trimmedValue = value.trim();
        console.log(trimmedValue)
        debugger;
        setAddress({ ...address, [e.target.name]: trimmedValue })
        console.log(address)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newAddress = await createAddress(address);
        debugger;
        let updatedUser = await saveAddress(newAddress);
        setAuthUser(updatedUser);
        toast.success("Address added!");

        props.handler();


    }


    return (
        <Wrapper>
            <form className='address-form' id='address-form' autoComplete='on' onSubmit={handleSubmit}>
                <div className='address-container'>
                    <div className='input-sub-container'>
                        <input className='input' label='firstName' name='firstName' placeholder='First Name' value={address.firstName} onChange={handleAddress} ></input>

                        <input className='input' label='lastName' name='lastName' placeholder='Last Name' value={address.lastName} onChange={handleAddress}></input>

                    </div>

                    <div className='input-sub-container'>
                        <input className='address' label='address' name='address' placeholder='Address' value={address.address} onChange={handleAddress} ></input>

                    </div>

                    <div className='input-sub-container'>
                        <input className='input' label='city' name='city' placeholder='City' value={address.city} onChange={handleAddress}></input>

                        <input className='input' label='state' name='state' placeholder='State' value={address.state} onChange={handleAddress}></input>

                    </div>
                    <div className='input-sub-container'>
                        <Select className='select' label='country' options={countries} value={address.country} onChange={(val) => { setAddress({ ...address, country: val }) }} />
                        <input className='input' label='phoneNumber' name='phone' placeholder='Phone No.' value={address.phone} onChange={handleAddress}></input>

                    </div>

                </div>

                <div className='submit-button'>
                    <Button type='submit'> Add</Button>
                </div>


            </form>
            <Toaster position="top-center" toastOptions={{
                style: {
                    border: '1px solid black',
                    fontSize: '20px',
                    padding: '16px'
                }
            }} />
        </Wrapper>


    )
}


const Wrapper = styled.section`
    padding:  0;
    margin: 0 2rem;
    display:flex;
    justify-content:center;

    .address-form{
        width: 40vw;
        padding: 4rem ;
        
        border-style: none;        
        margin-bottom: 5%;
        margin-top: 0;
        box-shadow: 24;
        border-radius: 1em;        
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }) => theme.colors.shading};  
        
        .address-container{
             
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content: center;
        }

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
        .submit-button{
            margin-left:45%
        }
        

    }

`;

export default AddAddress;
