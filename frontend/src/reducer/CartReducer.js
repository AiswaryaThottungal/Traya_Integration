

const CartReducer = (state,action) => {
    let updatedCart;
    let existingProduct;
    switch (action.type){
        case "ADD_TO_CART":
            let {id,selectedSize,quantity,product} = action.payload;      
            const size= selectedSize.size;
            
            debugger;
            if(state.cart !==null){
                 existingProduct = state.cart.find((currentItem)=> currentItem.id === id + size);
                console.log("🚀 ~ file: CartReducer.js:8 ~ CartReducer ~ existingProduct:", existingProduct)
                if(existingProduct){
                    let updatedCart = state.cart.map((currentItem) =>{
                        if(currentItem.id === id + size){
                            let updatedQuantity= currentItem.quantity+ quantity;
                            if(updatedQuantity>= currentItem.max){
                                updatedQuantity = currentItem.max;
                            }
                            debugger;
                            return{
                                ...currentItem,
                                quantity: updatedQuantity
                            };
                        }
                        else{
                            return currentItem;
                        }
                    });
                    return{
                        ...state,
                        cart: updatedCart
                    }
                }
                else{
                    console.log("check")
                console.log(product.sizeAvailable.find((currentItem)=> currentItem.size === size))
                    let newProduct = {
                        id : id + size,
                        name : product.name,
                        size,
                        quantity,  
                        image: product.images[0].src,         
                        price :product.price,
                        max: selectedSize.quantity
                    };
                    debugger;
                    return{
                        ...state,
                        cart :[...state.cart,newProduct]
                    }
                }
            }
            else{
                console.log("check")
                console.log(product.sizeAvailable.find((currentItem)=> currentItem.size === size))
                let newProduct = {
                    id : id + size,
                    name : product.name,
                    size,
                    quantity,  
                    image: product.images[0].src,         
                    price :product.price,
                    max:selectedSize.quantity
                };
                debugger;
                return{
                    ...state,
                    cart :[newProduct]
                }
                
            }
            
            
            

            
        case "REMOVE_ITEM":
             updatedCart= state.cart.filter((currentItem)=> currentItem.id !== action.payload.id);
            
            return{
                ...state,
                cart : updatedCart
            }
        case "CLEAR_CART":            
            return{
                ...state,
                cart:[]
            }
        case "DECREASE_QUANTITY":
            debugger;
             updatedCart = state.cart.map((currentItem) =>{
                if(currentItem.id === action.payload.id){
                    let updatedQuantity = currentItem.quantity > 1 ? currentItem.quantity-1 :currentItem.quantity;
                    debugger;
                    return{
                        ...currentItem,
                        quantity: updatedQuantity
                    };
                }
                else{
                    return currentItem;
                }
            });
                
            return{
                ...state,
                cart:updatedCart
            }
        
        case "INCREASE_QUANTITY":
            debugger;
            updatedCart = state.cart.map((currentItem) =>{
                if(currentItem.id === action.payload.id){
                    let updatedQuantity = currentItem.quantity === currentItem.max ? currentItem.max :currentItem.quantity+1;
                    debugger;
                    return{
                        ...currentItem,
                        quantity: updatedQuantity
                    };
                }
                else{
                    return currentItem;
                }
            });
                
            return{
                ...state,
                cart:updatedCart
            }
      /*   case "CART_TOTAL_ITEM":
            let updatedItemVal = state.cart.reduce((initialVal, currentItem) => {
                let {quantity} =currentItem;
                initialVal= initialVal + quantity;
                return initialVal;
            },0);

            return {
                ...state,
                total_item : updatedItemVal
            }; */

      /*   case "CART_TOTAL_PRICE":
            let updatedTotalPrice= state.cart.reduce((initialVal, currentItem) =>{
                let {price,quantity} = currentItem;
                initialVal = initialVal + (price*quantity);
                return initialVal;
            },0);
            return{
                ...state,
                total_price: updatedTotalPrice
            } */

        case "CART_ITEM_PRICE_TOTAL":
            if(state.cart!== null){
                let {total_item, total_price} = state.cart.reduce((accumulator, currentItem) =>{
                    let {price,quantity} = currentItem;
                    accumulator.total_item += quantity;
                    accumulator.total_price += price*quantity
                    return accumulator;
                },
                {
                    total_item: 0,
                    total_price:0,
                }
                );
                return{
                    ...state,
                    total_item,
                    total_price
                }

            }
            
        default:
            return state;
        
    }
    
}

export default CartReducer;
