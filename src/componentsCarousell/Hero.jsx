import React, { useState } from "react";
import { shoes } from "../utils/data";
import Carousel from "./Carousel";
import Button from "./Button";
import "./hero.css";

const Hero = () => {
  const [carouselDirection, setCarouselDirection] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedShoe, setSelectedShoe] = useState(shoes[1]);
  const [showDetail, setShowDetail] = useState(false);

  const handleSeeMore = (index) => {
    setSelectedShoe(shoes[index]);
    setShowDetail(true);
    setCarouselDirection("");
  };

  return (
    <section className={` ${showDetail ? "hero showDetail" : "hero"}`}>
      <Carousel
        items={shoes}
        onSeeMore={handleSeeMore}
        setShowDetail={setShowDetail}
        carouselDirection={carouselDirection}
        setCarouselDirection={setCarouselDirection}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      {showDetail && selectedShoe && (
        <div className="detail">
          <h2 className="title">{selectedShoe?.title}</h2>
          <p className="description">{selectedShoe?.description}</p>
          <div className="specifications">
            {/* <div>
              <p>Durability</p>
              <p>{selectedShoe?.specifications?.durability}</p>
            </div>
            <div>
              <p>Weight</p>
              <p>{selectedShoe?.specifications?.weight}</p>
            </div>
            <div>
              <p>Fit</p>
              <p>{selectedShoe?.specifications?.fit}</p>
            </div> */}
            <div>
              <p>Precio</p>
              <p>{selectedShoe?.specifications?.traction}</p>
            </div>
          </div>
          <div className="checkout">
            {/* <Button content="add to cart" /> */}
            <Button content="ver detalle" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
