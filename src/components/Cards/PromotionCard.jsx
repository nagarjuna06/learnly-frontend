import { Button, Img } from "../FromElements";
import Images from "../Images";
import "./index.css";

const PromotionCard = () => {
  return (
    <div className="promotion">
      <div className="promotion-content">
        <h1>Best Online Courses</h1>
        <p>
          Discover the best online courses for you, Expert instructors in every
          field we pursue. Interactive lessons that keep you engaged, Flexible
          learning, no need to be caged. A personalized path that suits your
          pace, Join our community, a welcoming space. Certifications to show
          what you've achieved, A seamless interface, easy to believe. Lifetime
          access, never lose your way, Affordable prices, we're here to stay.
          Unlock your potential, your dreams in sight, The ultimate platform for
          your learning delight.
        </p>
        <Button
          value="start now"
          style={{ borderRadius: 30 }}
          href="#courses"
        />
      </div>
      <Img className="promotion-image" src={Images.banner} />
    </div>
  );
};

export default PromotionCard;
