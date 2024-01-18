import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Button } from './styles/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ValidateForm from './helpers/ValidateForm';
import {toast, Toaster} from 'react-hot-toast';
const SignUp = () => {  
  
    const REGISTER_URL = 'http://localhost:5000/api/user/register';
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cPassword: ''
    })

    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();
   const handleSubmit = async(e) => {
        e.preventDefault();       
        let validationErrors = {};
        if(formData.firstname === '' || formData.firstname === null){          
            validationErrors.firstname = "First name Required";
        }
        if(formData.lastname === '' || formData.lastname === null){            
            validationErrors.lastname = "Last name Required";
        }
        if(formData.email === '' || formData.email === null){            
            validationErrors.email = "Email Required";
        }else if(!/\S+@\S+\.\S+/.test(formData.email)){            
            validationErrors.email = "Email is not Valid";  
        }
        if(formData.password === '' || formData.password === null){            
            validationErrors.password = "Password Required";
        }else if(formData.password.length<8){            
            validationErrors.password = "Password should contian atlease 8 characters";  
        }
        if(formData.cPassword !== formData.password){            
            validationErrors.cPassword = "Confirm password must be same as the password entered";
        }
        setErrors(validationErrors);
        
        if(Object.keys(validationErrors).length === 0 ){
            try{
                const response = await axios.post(REGISTER_URL, formData);   

               console.log(response.data)
               document.getElementById("signup-form").reset();
               toast.success("Registration complete!")
               navigate('/login')
            }
            catch(error){
                console.log(error.response.data)
                toast.error(error.response.data.message)
            }
          
        }
        
    }
    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    useEffect(()=> {
       
    })
  return (
    <>  
        <SignUpWrapper>
        <div className='signup-container'>       
             
            <form className='signup-form' id='signup-form' autoComplete='off' onSubmit={handleSubmit}>
                
                <h2 className='text'>SignUp</h2>
                
                <div className='input-container'>  
                    <input className='input'  label='firstName'  name='firstname' placeholder='Enter First Name' value={formData.firstname} onChange={handleChange} ></input> 
                    {errors.firstname && <p style={{color:"red"}}>{errors.firstname}</p>}
                    <input className='input'  label='lastName'  name='lastname' placeholder='Enter Last Name' value={formData.lastname} onChange={handleChange}></input> 
                    {errors.lastname && <p style={{color:"red"}}>{errors.lastname}</p>}                                  
                    <input className='input' label='Email Id' name='email' placeholder='Enter email-id' type='email' value={formData.email} onChange={handleChange} ></input>
                    {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
                    <input className='input' label='Password' name='password' placeholder='Enter Password' type='password' value={formData.password} onChange={handleChange}></input>
                    {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
                    <input className='input' label='cPassword' name='cPassword' placeholder='Confirm Password' type='password' value={formData.cPassword} onChange={handleChange}></input>
                    {errors.cPassword && <p style={{color:"red"}}>{errors.cPassword}</p>}
                </div>                
                <Button type='submit'> Submit</Button>                
                              
            </form>
            <div className='login-container'>
            <p>Already Have an Account?</p>
                <NavLink to='/login'>
                    <button className='link-button'>Login</button>
                </NavLink>
            </div>
            <Toaster  position="top-center" toastOptions={{
                style: {
                    border: '1px solid black',
                    fontSize: '20px',
                    padding: '16px'
                }
            }}/>
        </div>
        </SignUpWrapper>
        
        
    
   
    </>
  )
}

const SignUpWrapper = styled.div`
width: 100vw;   
height: auto;    
display: flex;    
border: none;   
margin-top: 5rem;
margin-bottom: 5rem;
padding: 2rem;
align-items: center;
justify-content: center;
.signup-form{
    width: 25vw;
    padding: 60px;
    background-color: #B7E4C7;
    border-style: none;        
    margin-bottom: 5%;
    margin-top: 2%;
    box-shadow: 24;
    border-radius: 1em;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.login-container{
    text-align: center;
    align-items: center;
    justify-content: center;       
}

.text{
color: ${({ theme }) => theme.colors.primary};
font-size: 35px;
font-weight: 500;
padding: 2rem;
}
.input-container{
display: flex;
flex-direction: column;  
padding:2rem;
.input{
    padding: 1rem;
    margin: 1rem;
    border-color: ${({ theme }) => theme.colors.secondary};
}
}
.link-button {
text-decoration: none;
max-width: auto;
background-color:${({ theme }) => theme.colors.primary};
color: rgb(255 255 255);
padding: 1.2rem 2.2rem;
margin-top: 1rem;
border: none;
border-radius: 1rem;
text-transform: uppercase;
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
}

`;

export default SignUp;