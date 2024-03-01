import React from 'react'
import FormatPrice from '../helpers/FormatPrice';
import CartQuantityToggle from './CartQuantityToggle';
import { FaTrashAlt } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';

const OrderItem = ({id,productId,name,size,price,img,quantity}) => {
    
    const {removeItem,setDecrease,setIncrease,checkStock} = useCartContext();
    let stock = checkStock(id);
    debugger;
   
  return (
    
    <div className='order-heading grid grid-three-column'>
         {/*image*/}
        <div className='order-image--name'>
            <div>
                <figure>
                     <img src={img} alt={name}/> 
                </figure>
            </div>
            <div>
                <p>{name}</p>                
                
            </div>
        </div>

        {/*price*/}
        {/* <div className='cart-hide'>
            <p><FormatPrice price={price}/></p>
        </div> */}

         {/*Quantity*/}
         <div>
            <p> {quantity}</p>                 
        </div>
        
         {/*Total price*/}
         <div className='order-price'>
            <p> <FormatPrice price={price*quantity}/> </p>
         </div>

             
         

    </div>
    
    
  )
}

export default OrderItem;
