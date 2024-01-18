import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/FilterContext";

const Sort = () => {
  const { filter_products,getSortCriteria } = useFilterContext();
  return (
    <Wrapper className="sort-section">
      {/* 1st column  */}      
      
      <div className="product-data">
        <p>{`${filter_products.length} Products Available`}</p>
      </div>

     {/* 2nd column  */}
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onClick={getSortCriteria}>
            <option className="sort-option" value="lowest">Price(lowest)</option>            
            <option className="sort-option" value="highest">Price(highest)</option>            
            <option value="a-z">Alphabetically(a-z)</option>            
            <option value="z-a">Alphabetically(z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;    
    
  }
  
`;

export default Sort;
