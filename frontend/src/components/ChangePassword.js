import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../styles/Button'
import { useAuth } from "../context/AuthContext";
import { toast, Toaster } from 'react-hot-toast';



const ChangePassword = (props) => {
    const { updatePassword } = useAuth();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    debugger;
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    function handleChange(e) {
        debugger;
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (formData.currentPassword === '' || formData.currentPassword === null) {
            validationErrors.currentPassword = "Password Required";
        } else if (formData.currentPassword.length < 8) {
            validationErrors.currentPassword = "Password should contain atlease 8 characters";
        }
        if (formData.newPassword === '' || formData.newPassword === null) {
            validationErrors.newPassword = "Password Required";
        } else if (formData.newPassword.length < 8) {
            validationErrors.newPassword = "Password should contain atlease 8 characters";
        }
        if (formData.confirmPassword !== formData.newPassword) {
            validationErrors.confirmPassword = "Confirm password must be same as the password entered";
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const updatedPassword = await updatePassword(formData.currentPassword, formData.newPassword)

                console.log(updatedPassword)
                document.getElementById("password-form").reset();
                toast.success("Password changed successfully! Please login again. ")
                navigate('/login')
            }
            catch (error) {
                console.log(error.response.data)
                toast.error(error.response.data.message)
            }

        }


    }


    return (
        <Wrapper>
            
            <form className='password-form' id='password-form' autoComplete='on' onSubmit={handleSubmit}>
                <div className='input-sub-container'>
                    <div className='password-container'>
                        <span>Enter current Password:</span>
                        <input className='input' label='currentPassword' name='currentPassword' placeholder='Current Password' value={formData.currentPassword} type='password' onChange={handleChange} ></input>
                    </div>
                    <div className='password-container'>
                        <span>Enter new Password:</span>
                        <input className='input' label='newPassword' name='newPassword' placeholder='New Password' value={formData.newPassword} type='password' onChange={handleChange}></input>
                    </div>
                    <div className='password-container'>
                        <span>Confirm new Password:</span>
                        <input className='input' label='confirmPassword' name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} type='password' onChange={handleChange}></input>
                    </div>
                </div>

                <div className='submit-button'>
                    <button>Submit</button>
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

    .password-form{
        width: 40vw;
        padding: 2rem ;
        display:flex;
        flex-direction:column;
        border-style: none;        
        margin-bottom: 5%;
        margin-top: 0;
        box-shadow: 24;
        border-radius: 1em;
        text-align: left;
        align-items: center;
        justify-content: center;;
        background-color: ${({ theme }) => theme.colors.shading};  
        

        .input-sub-container{           
            width :75%;           
            padding:0;
            display: flex;
            flex-direction:column;
            justify-content:space-between;
            .password-container{
                display:flex;
                align-items:center;
                span{
                    margin:0;
                    font-size: 1.6rem;
                    width:20rem;
                }
                input{
                   
                    width:50%;
                    border-radius: 1em;
                    margin: 1.8rem;
                }
            }    
           
           
        }
        button{
            text-decoration: none;
            max-width: auto;
            background-color:${({ theme }) => theme.colors.highlighter};
            color: rgb(255 255 255);
            padding: 1.2rem 2.2rem;
            border: none;
            border-radius: 3rem;
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

        

    }

`;

export default ChangePassword;
