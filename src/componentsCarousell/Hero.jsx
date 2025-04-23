import React, { useContext, useState } from "react";
// import { shoes } from "../utils/data";
import Carousel from "./Carousel";
import Button from "./Button";
import "./hero.css";
import { useModelRecommended } from "../domain/models/useModels";
import { AuthContext } from "../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { data: shoes, loading, error } = useModelRecommended();
  const [carouselDirection, setCarouselDirection] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedShoe, setSelectedShoe] = useState(shoes ? shoes[0] : null);
  const [showDetail, setShowDetail] = useState(false);
  console.log("data", shoes);

  const handleSeeMore = (index) => {
    setSelectedShoe(shoes[index]);
    setShowDetail(true);
    setCarouselDirection("");
  };
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (user) {
      navigate(`/productos/${id}`);
    } else {
      navigate(`/login`);
    }
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
          <h2 className="title">{selectedShoe?.name}</h2>
          <p
            className="description"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {selectedShoe?.description}
          </p>
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
              <p>
                {selectedShoe?.normalPrice.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
          <div className="checkout">
            {/* <Button content="add to cart" /> */}
            <Button
              content="ver detalle"
              onClick={() => handleClick(selectedShoe.id)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
