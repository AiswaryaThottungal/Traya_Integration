import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './styles/Button';
import styled from 'styled-components';

const Order = () => {
  const Wrapper = styled.div`
      padding: 10rem;
      text-align: center;
      p{
        font-size: x-large;
        padding: 2rem;
        color:red;
      }
  `;
  return (
    <Wrapper>
      <h2>Website Under Maintenance! </h2>
      <p>No actual order will be delivered. Thank You!</p>
      <NavLink to='/'>
        <Button>Go To Home Page</Button>
      </NavLink>
    </Wrapper>
  )
}

export default Order;
