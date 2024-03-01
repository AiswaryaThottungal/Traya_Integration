import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/ProductContext";
import { useEffect } from "react";
import PageNavigation from "./components/PageNavigation";
import ProductImage from "./components/ProductImage";
import { TbTruckDelivery, TbReplace, TbTruckReturn } from "react-icons/tb";
import AddToCart from "./components/AddToCart";

const API = "http://localhost:5000/api/products/";
const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =  useProductContext(); 
  console.log("SingleProduct:")
  console.log(singleProduct)

  const { id } = useParams(); 

  const {_id:alias,  
    name,   
    description,    
    category,
    price,
    images,    
    featured,
    sizeAvailable,
    stock
   } = singleProduct;   
    console.log("🚀 ~ file: SingleProduct.js:25 ~ SingleProduct ~ images:", images)
    console.log(singleProduct)
  debugger;

  useEffect(() => {
    getSingleProduct(id);
  }, []);  

  debugger;
  
  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  return (
    <Wrapper>
    <PageNavigation title={name} />
    <div className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <ProductImage imagelist={images} />
          </div>        
        
          {/* product dAta  */}
          <div className="product-data">
            <h2>{name}</h2>            

            <p className="product-data-price">
              Rs.{price}           
            </p>
            
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">                
                <TbTruckReturn className="warranty-icon" />
                <p>30 Days Return</p>
              </div>            
              
            </div>
           

         {/*    <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              
              <p>
                Collection :<span> {collection} </span>
              </p>
            </div> */}
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}            
          </div>
        </div>
    </div>
    
  </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: left;
      gap: 6rem;
      align-items: center;     
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
  
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
      .product-details{
        text-transform: uppercase;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
