import React from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope} from "react-icons/fa";


const ItemStyles= styled.div`
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.primary}; 
    display: flex;
    align-items: center;
    gap: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
`;
const ContactStyles = styled.div`
      
      display:flex;  
      flex-direction:column ;
      justify-content: center;
      align-items: center;
      text-align: center;
      .header-wrapper{
            display: flex;
            flex-direction: column;
           text-align: center;
           padding: 20px;
      }
      .contact-header{
          font-weight: bold;
      }
      .contact-content{
          text-align: center;
          font-size: large;
      }
  `;
  const ContactSection = styled.div`
      background-color: aliceblue;
      width: 40rem;
      text-align: center;
      justify-self: center;
      margin-top: 5rem;
      font-size: large;
  `;
  const ContactHeader = styled.div`
    border-style: none;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.secondary}; 
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
`;
const ContactItem = styled.div`
    
    border-style: none;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.subtle}; 
    display: flex;
    align-items: center;
    gap: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
`;
const Contact = () => {  

  return (
    <ContactStyles>
      <div className='header-wrapper'>
        <h2 className='contact-header'>Get In Touch With Us!</h2> <br />
        <p className='contact-content'>If u have any questions or need help, please contact us in one of the ways listed below. We love to hear from you.</p>
      </div>
      
     
        <ContactSection>
          <ContactHeader>Contact Details</ContactHeader>
          <ContactItem> <FaPhone/>(+91) 1234567890</ContactItem>
          <ContactItem><FaEnvelope/>trayadesigns@gmail.com</ContactItem>
        </ContactSection>
          
        
    </ContactStyles>
  )
}

export default Contact;