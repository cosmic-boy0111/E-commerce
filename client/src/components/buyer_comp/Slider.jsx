

import React,{useState,useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide:1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};




const Slider = ({data}) => {


  
  return (
    <>
      <div className='slider_div'>

      <Carousel
        infinite={true}
        responsive={responsive}
        draggable={false}
        swipeable={false}
        centerMode={true}
        // autoPlay={true}
        // autoPlaySpeed={1000000}
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        // keyBoardControl={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-0-px"
      >

        {
          data.map(e=>{
            return <Card obj={e}/>
          })
        }
        </Carousel>
      </div>
    </>
  )
}

export default Slider

