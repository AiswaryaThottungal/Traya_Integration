import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartQuantityToggle = ({ quantity, setDecrease, setIncrease }) => {
  debugger;
  return (
    <div className="cart-button">
      <div className="quantity-toggle">
        <button onClick={() => setDecrease()}>
          <FaMinus />
        </button>
        <div className="quantity-style">{quantity}</div>
        <button onClick={() => setIncrease()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};



export default CartQuantityToggle;
