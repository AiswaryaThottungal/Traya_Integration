import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from  "../reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],  
  grid_view: true,  
  sorting_criteria: "lowest",
  filters: {
    text: "",
    collection: "All",
    category: "All",
    fabric: "All",
    size: "All",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  }
  };


export const FilterContextProvider = ({children}) => {
   

    const {products} = useProductContext();   
    console.log(products) 
    const [state,dispatch] = useReducer(reducer,initialState);

  //getting the sorting criteria
  const getSortCriteria = (event) => {    
    let sortCriteria = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: sortCriteria });
  }

  //updating filter values
  const updateFilterValue = (event) =>{
    let name = event.target.name;
    let value= event.target.value;
    return dispatch({type:"UPDATE_FILTER_VALUE", payload:{name,value}});
  }

  // Loading all the products for grid view
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  //Filtering and Sorting the products
  useEffect (() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS",payload: products });
  }, [state.sorting_criteria,state.filters]);

  //clear all filters

  const clearFilters = () =>{
    dispatch({ type: "CLEAR_FILTERS" });
  }


  

    return (
        <FilterContext.Provider value = {{ ...state,getSortCriteria,updateFilterValue,clearFilters}}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilterContext = () => {
   return useContext(FilterContext);
}
