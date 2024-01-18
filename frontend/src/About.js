import React from 'react';
import styled from 'styled-components';


const AboutWrapper = styled.div`
    color:'rgb(40, 35, 35)';
    text-align :'center';
    padding: 2rem;
    align-items: center;
    justify-content: center;
    h3{
      font-weight:"bold";
      font-size: xx-large;
      font-style: italic;      
      color: ${({ theme }) => theme.colors.primary}; 
      text-align: center;
    }
    p{
      text-align: justify;
      font-size: large;
    }
    .company-features{      
      font-size: large;
      color: ${({ theme }) => theme.colors.text};
      margin-top: 1rem;
      li{
        list-style: inside;
        padding: 0.5rem;
      }
    }
`;

const About = () => {
  
  return (
    <AboutWrapper>
      <div>
        <h3 className='header'> Our Story</h3>
        <br />
        <p>
            Traya's goal is to design and deliver comfortable and elegant handmade outfits for women and kids. 
            Traya is for those who value the simplicity of handlooms and handmade goods. 
            Our kids wear range uses natural breathable fabrics and produces outfits in kids-friendly designs. 
            <br/><br />
        </p>
        <p> What makes Traya unique ?</p>   <br />            
            <div>       
            <ul className='company-features'>
                <li>Handcrafted clothes with artistic touch</li>
                <li>Simple and elegant designs which are not mass-produced</li>
                <li>Natural and breathable fabrics</li>
                <li>Hand-embroidered details</li>
                <li>Reasonable price</li>
            </ul> 
            </div>     
        
      </div>
    </AboutWrapper>
  )
}

export default About;
