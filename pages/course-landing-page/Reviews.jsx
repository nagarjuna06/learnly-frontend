import { MdStar } from "react-icons/md";
import ReviewItem from "../../src/components/Cards/ReviewItem";
import { useState } from "react";

const Reviews = ({ reviews = [], rating = 0 }) => {
  if (!reviews.length) {
    return null;
  }
  const [maxReviews, setMaxReviews] = useState(4);
  const handleMaxReviews = () => setMaxReviews(reviews.length);
  const handleMinReviews = () => setMaxReviews(4);
  const remain = reviews?.length - maxReviews;
  return (
    <div className="course-reviews" id="reviews">
      <h2>
        <MdStar color="#f69c08" />
        &nbsp;
        {parseFloat(rating).toFixed(1)}&nbsp;&#8226;&nbsp;
        {reviews.length} rating{reviews.length > 1 ? "s" : ""}
      </h2>
      <div>
        {reviews.slice(0, maxReviews).map((each, index) => (
          <ReviewItem key={index} {...each} />
        ))}
      </div>
      {remain > 0 ? (
        <button className="remain-button" onClick={handleMaxReviews}>
          Show More Reviews
        </button>
      ) : null}
      {remain === 0 ? (
        <button className="remain-button" onClick={handleMinReviews}>
          Show less Reviews
        </button>
      ) : null}
    </div>
  );
};

export default Reviews;
