import React from "react";
import styled from "styled-components";
import Carousel from './components/Carousel';
import { banner } from './components/CarouselData';
import FeaturedProducts from "./components/FeaturedProducts";

const Home = () => {
  return (
    <>
      <Carousel images={banner} />
      <FeaturedProducts/>
    </>
  
  )
};



export default Home;
