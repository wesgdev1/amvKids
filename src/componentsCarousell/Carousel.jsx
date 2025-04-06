// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import CarouselItem from "./CarouselItem";
import Button from "./Button";
import "./carousel.css";

const Carousel = ({
  items,
  onSeeMore,
  setShowDetail,
  carouselDirection,
  setCarouselDirection,
  currentIndex,
  setCurrentIndex,
}) => {
  const maxItems = 5;

  const handleNext = () => {
    console.log("next");
    setCarouselDirection("next");
    const newIndex = (currentIndex + 1) % maxItems;
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    setCarouselDirection("prev");
    const newIndex = (currentIndex - 1 + maxItems) % maxItems;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={`carousel ${carouselDirection}`}>
      <div className="list">
        {items?.slice(0, maxItems).map((item, index) => {
          const isSelected = index === currentIndex;
          const isPrevious = index === (currentIndex - 1 + maxItems) % maxItems;
          const isNext = index === (currentIndex + 1) % maxItems;
          const isFar = index === (currentIndex + 2) % maxItems;
          const isVeryFar = index === (currentIndex + 3) % maxItems;

          return (
            <CarouselItem
              key={item?.id}
              item={item}
              isSelected={isSelected}
              isPrevious={isPrevious}
              isNext={isNext}
              isFar={isFar}
              isVeryFar={isVeryFar}
              onSeeMore={() => onSeeMore(index)}
            />
          );
        })}
      </div>
      <div className="arrows">
        <Button
          content={<i className="bi bi-skip-backward-circle-fill"></i>}
          id="prev"
          onClick={handlePrev}
        />
        <Button
          className="text-black"
          content="Volver"
          id="back"
          onClick={() => setShowDetail(false)}
        />
        <Button content={"next"} id="next" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Carousel;
