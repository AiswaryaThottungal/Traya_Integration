import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import CartQuantityToggle from "./CartQuantityToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/CartContext";

const AddToCart = ({product}) => {
  const { addToCart } = useCartContext();

  const { _id, sizeAvailable } = product;
  
  const [currentSize, setCurrentSize] = useState(sizeAvailable[0]);  
  
  const [quantity, setQuantity] = useState(1);
  
  debugger;
  const setDecrease = () => {   
    console.log(currentSize) ;
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
    debugger;
  };

  const setIncrease = () => {
    const availableStock= currentSize.quantity;
    console.log(currentSize);
    quantity < availableStock ? setQuantity(quantity + 1) : setQuantity(availableStock);
    debugger;
  };
 

  return (
    <Wrapper>
         <div className="sizes">
        <p>
          Size:
          <select id='sizes' onChange={(e) =>{
            const selectedIndex =document.getElementById("sizes").selectedIndex;            
            setCurrentSize(sizeAvailable[selectedIndex]);
            }            
            
          }>
          {sizeAvailable.map((currentItem, index) => {
            debugger;
            return (
              <option
                key={index}  value={currentItem.size}>
                {currentItem.size}
              </option>
            ); 
          })}
          </select>
          
        </p>
      </div><br/>
      <div><p className='stock-info'>Available: {currentSize.quantity}</p></div>
        {/* add to cart  */}
      <CartQuantityToggle
        quantity={quantity}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to="/cart" onClick={() => addToCart(currentSize,quantity,product)}>
        <Button className="btn">Add To Cart</Button>
      </NavLink>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .sizes p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
 .stock-info{
  font-size:1.2rem;
  color:gray;
 }
  
`;

export default AddToCart;
