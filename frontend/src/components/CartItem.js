import React from 'react'
import FormatPrice from '../helpers/FormatPrice';
import CartQuantityToggle from './CartQuantityToggle';
import { FaTrashAlt } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';

const CartItem = ({id,name,image,size,price,quantity}) => {
    
    const {removeItem,setDecrease,setIncrease} = useCartContext();
   
  return (
    
    <div className='cart-heading grid grid-five-column'>
         {/*image*/}
        <div className='cart-image--name'>
            <div>
                <figure>
                    <img src={image} alt={id}/>
                </figure>
            </div>
            <div>
                <p>{name}</p>
                <p>Size: {size}</p>
            </div>
        </div>

        {/*price*/}
        <div className='cart-hide'>
            <p><FormatPrice price={price}/></p>
        </div>

         {/*Quantity*/}
         <div>
            <CartQuantityToggle
            quantity={quantity}
            setDecrease={() => setDecrease(id)}
            setIncrease={() =>setIncrease(id)}
            />
         </div>
        
         {/*Total price*/}
         <div className='cart-hide'>
            <p> <FormatPrice price={price*quantity}/> </p>
         </div>

         {/*Remove Item*/}
         <div>
            <FaTrashAlt className='remove_icon' onClick={()=> removeItem(id)}/>
         </div>        
         

    </div>
    
    
  )
}

export default CartItem;
