import React from "react";
import { NavLink } from "react-router-dom";


const DisplayProduct = (curElem) => {
  const { _id, name,price, images } = curElem;  
  console.log("Display Product"); 
 const {_id:imgId,src} = images[0];
 debugger;
  return (
    <NavLink to={`/singleproduct/${_id}`}>
      <div className="card">
        <figure>
          <img src={src} alt={name} />
          
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">Rs.{price}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default DisplayProduct;