import { useEffect } from "react";
import { Img } from "../../src/components/FromElements";
import Images from "../../src/components/Images";
import Header from "../../src/components/NavBar/Header";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { getWishlist } from "../../redux/slice/authSlice";
import CircleLoading from "../../src/components/Loading/Circle";
import CourseItem from "../../src/components/Cards/CourseItem";

const WishList = () => {
  const dispatch = useDispatch();
  const { loading, wishlistCourses, profile } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (profile?.wishlist.length) {
      dispatch(getWishlist());
    }
  }, [profile]);
  return (
    <div className="wishlist">
      {loading ? (
        <CircleLoading />
      ) : (
        <>
          <h1>Wishlist</h1>
          {profile?.wishlist.length ? (
            <div className="course-wishlist">
              {wishlistCourses.map((course, index) => (
                <CourseItem key={index} {...course} />
              ))}
            </div>
          ) : (
            <div className="user-img">
              <Img src={Images.wishlist} alt="wishlist" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WishList;
