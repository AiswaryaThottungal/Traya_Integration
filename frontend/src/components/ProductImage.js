import React, { useState } from "react";
import styled from "styled-components";

const ProductImage = ({ imagelist = [{ src: "" }] }) => {
  console.log("🚀 ~ file: ProductImage.js:5 ~ ProductImage ~ imagelist:", imagelist)
  const [mainImage, setMainImage] = useState(imagelist[0]);
  debugger;
  return (
    <Wrapper>
      <div className="grid grid-four-column">
        {imagelist.map((item, index) => {
          console.log("🚀 ~ file: ProductImage.js:12 ~ {imagelist.map ~ item:", item)
          return (
            <figure>
              <img
                src={item.src}
                alt={item.id}
                className="box-image--style"
                key={index}
                onClick={() => setMainImage(item)}
              />
            </figure>
          );
        })}
      </div>
      {/* 2nd column  */}
        
      <div className="main-screen">
        <img src={mainImage.src} alt={mainImage.id} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */

    img {
      width: 30vw;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      background-size:cover;
      object-fit: cover;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default ProductImage;