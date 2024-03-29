import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from "./context/ProductContext";
import { FilterContextProvider } from './context/FilterContext';
import { CartContextProvider } from './context/CartContext';
import { AuthContextProvider } from './context/AuthContext';
import { OrderContextProvider } from './context/OrderContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
      <AppProvider>  
        <FilterContextProvider>
          <AuthContextProvider>
            <CartContextProvider>
              <OrderContextProvider>
              <App/>
              </OrderContextProvider>             
            </CartContextProvider> 
          </AuthContextProvider>         
        </FilterContextProvider> 
      </AppProvider>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
