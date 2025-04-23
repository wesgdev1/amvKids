import Button from "./Button";
import "./carousel.css";

const CarouselItem = ({
  item,
  isSelected,
  isPrevious,
  isNext,
  isFar,
  isVeryFar,
  onSeeMore,
}) => {
  return (
    <div
      className={`item ${isSelected ? "selected" : ""} ${
        isPrevious ? "previous" : ""
      } ${isNext ? "next" : ""} ${isFar ? "far" : ""} ${
        isVeryFar ? "very-far" : ""
      }`}
    >
      <img
        src={
          item?.images.find((img) => img.isRecommended)?.url ||
          item?.images[0]?.url
        }
        alt={item?.name}
      />
      <div className="introduce">
        <h4 className="subtitle">
          {item?.name} - {item?.color}{" "}
        </h4>
        <h2 className="title">{item?.title}</h2>
        <p className="description">{item?.description}</p>
        <Button
          content="Ver mas"
          className="seeMore text-black"
          onClick={onSeeMore}
        />
      </div>
    </div>
  );
};

export default CarouselItem;
