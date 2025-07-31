import React from "react";
import Carousel from "react-multi-carousel";
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
import "react-multi-carousel/lib/styles.css";

export default function BannerSection() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="z-0 max-w-7xl mx-auto m-5">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        dotListClass="custom-dot-list-style"
        containerClass="carousel-container rounded-lg"
      >
        <div className="">
          <img src={banner1} className="" alt="Banner Makanan 1" />
        </div>
        <div className="">
          <img
            src={banner2}
            className="w-full h-full "
            alt="Banner Makanan 2"
          />
        </div>
      </Carousel>
    </div>
  );
}
