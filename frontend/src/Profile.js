import React from 'react';
import { Button } from './styles/Button';
import styled from 'styled-components';

const Profile = () => {
  const Wrapper = styled.div`
      padding: 10rem;
      text-align: center;
      p{
        font-size: x-large;
        padding: 2rem;
      }
  `;
  return (
    <Wrapper>
      <h2>Profile</h2>
      
    </Wrapper>
  )
}

export default Profile;
