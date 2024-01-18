import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './styles/Button';
import styled from 'styled-components';

const ErrorPage = () => {
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
      <h2>404-Page not found!</h2>
      <p>The page you are looking for does not exist. Click the button below to go back to homepage.</p>
      <NavLink to='/'>
        <Button>Go To Home Page</Button>
      </NavLink>
    </Wrapper>
  )
}

export default ErrorPage;
