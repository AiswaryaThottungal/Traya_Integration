const FilterReducer= (state, action) => {
    switch(action.type){
        case "LOAD_FILTER_PRODUCTS":
            let priceArray=action.payload.map((currentItem) => currentItem.price);
            let maxPrice= Math.max(...priceArray)
            console.log("🚀 ~ file: FilterReducer.js:6 ~ FilterReducer ~ maxPrice:", maxPrice)
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: {...state.filters,maxPrice, price: maxPrice},           
              };
        case "GET_SORT_VALUE":           
            return {
                ...state,
                sorting_criteria : action.payload,
            };
        case "SORTING_PRODUCTS":
            let newSortData;
            const { filter_products, sorting_criteria } = state;
            let tempSortProduct = [...filter_products];
            
            const sortingProducts = (a, b) => {
                if (sorting_criteria === "lowest") {
                  return a.price - b.price;
                }
        
                if (sorting_criteria === "highest") {
                  return b.price - a.price;
                }
        
                if (sorting_criteria === "a-z") {
                  return a.name.localeCompare(b.name);
                }
        
                if (sorting_criteria === "z-a") {
                  return b.name.localeCompare(a.name);
                }
              };
        
              newSortData = tempSortProduct.sort(sortingProducts);
       
            return {
                ...state,
                filter_products : newSortData,
            };
        case "UPDATE_FILTER_VALUE":
            const {name, value} = action.payload;
            return{
                ...state,
                filters : {
                    ...state.filters,
                    [name] : value,
                },
            }
        case "FILTER_PRODUCTS":
            let {all_products} = state;
            let tempFilterData= [...all_products];
            const {text,category,fabric,size,price} =state.filters;            
            
            if(text){
                tempFilterData = tempFilterData.filter((currentItem) =>{                    
                    return currentItem.description.toLowerCase().includes(text);
                })
            }
            if(category!=="All"){                
                tempFilterData = tempFilterData.filter((currentItem) =>{                    
                    return currentItem.category === category;
                })
            }
            if(fabric!=="All"){                
                tempFilterData = tempFilterData.filter((currentItem) =>{                    
                    return currentItem.fabric === fabric;
                })
            }
            if(size!=="All"){                              
                tempFilterData = tempFilterData.filter((currentItem) =>{                      
                    console.log("hi"+currentItem.size)                  
                    return currentItem.size.includes(size);
                })
            }
            if (price) {
                
                tempFilterData = tempFilterData.filter(
                  (currentItem) => currentItem.price <= price
                );
            }
            return{
                ...state,
                filter_products :tempFilterData,
            }
        case "CLEAR_FILTERS":            
            return{
                ...state,
                filters:{
                    ...state.filters,
                    text: "",
                    collection: "All",
                    category: "All",
                    fabric: "All",
                    size: "All",
                    maxPrice: state.filters.maxPrice,
                    price: state.filters.maxPrice,
                    minPrice: state.filters.minPrice,
                }
            }
        default: 
        return state;

    }
}

export default FilterReducer;