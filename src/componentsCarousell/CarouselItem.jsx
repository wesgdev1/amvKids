import Button from './Button'
import './carousel.css'

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
      className={`item ${isSelected ? 'selected' : ''} ${
        isPrevious ? 'previous' : ''
      } ${isNext ? 'next' : ''} ${isFar ? 'far' : ''} ${
        isVeryFar ? 'very-far' : ''
      }`}
    >
      <img src={item?.image} alt={item?.title} />
      <div className="introduce">
        <h4 className="subtitle">New Collection</h4>
        <h2 className="title">{item?.title}</h2>
        <p className="description">{item?.description}</p>
        <Button content="see more" className="seeMore" onClick={onSeeMore} />
      </div>
    </div>
  )
}

export default CarouselItem
