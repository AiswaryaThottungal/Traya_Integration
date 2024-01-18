import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import ActionHeader from "./ActionHeader";


const Header = () => {
  return (
    <>
    <SubHeader>
      <ActionHeader />
    </SubHeader>
    <br />
    <MainHeader>
      <NavLink to="/">
        <img className="logo" src="../images/logo_new.png" alt="my logo img" />
      </NavLink>
      <Nav/>
     
    </MainHeader>
    </>
    
  );
};


const SubHeader = styled.header`
  padding: 0 2rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: space-between;  
  position: relative;  
`;
const MainHeader = styled.header`
  padding: 0 2rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 0.5px solid #2D6A4F;
  .logo {
    height: 3rem;
  }
`;
export default Header;