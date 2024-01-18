import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/FilterContext';
import FormatPrice from '../helpers/FormatPrice';
import { Button } from '../styles/Button';


const FilterSection = () => {
  const {
    filters: {text,category,fabric,size,maxPrice,price,minPrice},    
    all_products,
    updateFilterValue,
    clearFilters
  } = useFilterContext();
  console.log("🚀 ~ file: FilterSection.js:10 ~ FilterSection ~ maxPrice:", maxPrice)
  console.log("🚀 ~ file: FilterSection.js:10 ~ FilterSection ~ price:", price)
 debugger;
  //Get unique values for an attribute
  const getUniqueData = (data, attribute) =>{
    let attributeValues= data.map((currentItem)=>{
      return currentItem[attribute];
    });
    if(attribute === "size"){
      return attributeValues= ["All", ...new Set([].concat(...attributeValues))];
    }
    else{
      return attributeValues = ["All", ... new Set(attributeValues)]; 
    }
       
  }

  //Retrieving unique values for each filter field
  const categoryValues = getUniqueData(all_products,"category");
  const fabricValues = getUniqueData(all_products,"fabric");
  const sizeValues = getUniqueData(all_products,"size");   
debugger;
  return (
    <Wrapper>
      <div className='filter-search'>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
          type='text'
          name='text'
          value={text}
          placeholder='Search'
          onChange={updateFilterValue}
          />          
        </form>
      </div>

      <div className='filter-category'>
        <h3>Category</h3>
        <div>
          {categoryValues.map((currentItem,index) => {            
              return <button key={index}                  
                  type="button"
                  name="category"
                  value={currentItem}
                  className={currentItem === category ? "active" : ""}
                  onClick={updateFilterValue}>
                    {currentItem}
              </button>
          })}
        </div>
      </div>
      <div className='filter-fabric'>
        <h3>Fabric</h3>
        <div>
          {fabricValues.map((currentItem,index) => {            
            return <button key={index}
              type="button"
              name="fabric"
              value={currentItem}
              className={currentItem === fabric ? "active" : ""}
              onClick={updateFilterValue}>
                {currentItem}
              </button>
          })}
        </div>
      </div>
      <div className='filter-size'>
        <h3>Size</h3>
        <div>
          <select name='size'
            id='size'
            onClick={updateFilterValue}>
              {sizeValues.map((currentItem,index) => {            
               return <option key={index}
                value={currentItem}
                name="size">                
                  {currentItem}                    
                </option>
            })}
          </select>            
        </div>
      </div>

      <div className='filter-price'>
          <h3>Price</h3>
          <p><FormatPrice price={price}/></p>
          <div>
            <input type='range' name="price" id='price' min="100" max={maxPrice} value={price} step='any'  onChange={updateFilterValue} />
          </div>
          
      </div>

      <div className='filter-clear'>
        <Button onClick={clearFilters}>Clear Filters</Button>
      </div>

       

    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
    color: ${({ theme }) => theme.colors.text};
    font-weight:bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category, .filter-fabric {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      margin-top: 0;
      margin-bottom: 1rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.secondary};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  .filter-size {
    padding: 0.3rem 0rem;

    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

 

  .filter-price {
    input[type="range"] {
      -webkit-appearance: none;
      background: transparent;
      margin: 0;
      padding: 0;
      box-shadow: none;      
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      background:${({ theme }) => theme.colors.primary};
      height: 0.5rem;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      margin-top: -6px; /* Centers thumb on the track */
      background-color: ${({ theme }) => theme.colors.secondary};
      border-radius: 50%;
      height: 1.5rem;
      width: 1.5rem;    
    }
  }

  
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
