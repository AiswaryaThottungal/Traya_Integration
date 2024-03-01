

const CartReducer = (state,action) => {
    let updatedCart;
    let existingProduct;
    switch (action.type){        
        case "ADD_TO_CART":
            let {selectedSize,quantity,product} = action.payload;      
            const size= selectedSize.size; 
            const stock = selectedSize.quantity;
            const productId = product._id;
            console.log(product)
           
            debugger;
            if(state.cart !==null){
                 existingProduct = state.cart.find((currentItem)=> currentItem.id === productId + size);
                console.log("🚀 ~ file: CartReducer.js:8 ~ CartReducer ~ existingProduct:", existingProduct)
                if(existingProduct){
                    let updatedCart = state.cart.map((currentItem) =>{
                        if(currentItem.id === productId + size){
                            let updatedQuantity= currentItem.quantity+ quantity;
                            if(updatedQuantity>= stock){
                                updatedQuantity = stock;
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
                    
                console.log(product.sizeAvailable.find((currentItem)=> currentItem.size === size))
                    let newProduct = {
                        id : productId + size,
                        name : product.name,
                        productId: productId,
                        size,
                        quantity,  
                        img: product.images[0].src,         
                        price :product.price,
                        stock : stock
                        
                    };
                    debugger;
                    return{
                        ...state,
                        cart :[...state.cart,newProduct]
                    }
                }
            }
            else{
                
                console.log(product.sizeAvailable.find((currentItem)=> currentItem.size === size))
                let newProduct = {
                    id : productId + size,
                    name : product.name,
                    productId: productId,
                    size,
                    quantity,  
                    image: product.images[0].src,         
                    price :product.price,
                    stock:stock
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
                    let updatedQuantity = currentItem.quantity === currentItem.stock ? currentItem.stock :currentItem.quantity+1;
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
            if(state.cart.length!== 0){
                let {total_item, total_amount} = state.cart.reduce((accumulator, currentItem) =>{
                    let {price,quantity} = currentItem;
                    accumulator.total_item += quantity;
                    accumulator.total_amount += price*quantity
                    return accumulator;
                },
                {
                    total_item: 0,
                    total_amount:0,
                }
                );
                debugger;
                return{
                    ...state,
                    total_item,
                    total_amount
                }

            }
            return{
                ...state,
                total_item :0,
                total_amount:0
            }
        case "GET_CART_FROM_DB" :            
            let {cartData} = action.payload
            
            debugger;
            if(cartData){
                let cartItems= cartData.cartItems.map((currentItem) => {
                    let item ={}
                    item.productId = currentItem.product._id;
                    item.name = currentItem.product.name;
                    item.quantity = currentItem.quantity;
                    item.size = currentItem.size;
                    console.log(item.size)
                    item.img = currentItem.product.images[0].src;
                    item.price =currentItem.product.price;
                    item.id = item.productId+item.size;
                    const availableSizes = currentItem.product.sizeAvailable
                    console.log(availableSizes)                    
                    
                    let currentSize = availableSizes.find((currentItem)=> currentItem.size === item.size);
                    if(currentSize){
                        item.stock =currentSize.quantity;
                        
                    }else{
                        item.stock = 0;
                    }                   
                    
                    return {
                        ...item
                    }
    
                })
                return{
                    ...state,
                    cart: cartItems,
                    total_item: cartData.cartItems.length,
                    total_amount : cartData.cartTotal
                }
            }
            return{
                ...state
            }
            
        default:
            return state;
        
    }
    
}

export default CartReducer;
