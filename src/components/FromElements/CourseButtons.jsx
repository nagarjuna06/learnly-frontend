import { CircularProgress, IconButton } from "@mui/material";
import { Button } from "./index";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/slice/authSlice";
import { getEnrollId } from "../../utils";

const CourseButtons = ({ courseId, slug }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartLoading, wishlistLoading, profile } = useSelector(
    (state) => state.auth
  );
  const handleNavigation = (path) => {
    navigate(path);
  };
  if (profile?.enrolledCourses.some((c) => c.course === courseId)) {
    return (
      <div className="course-buttons">
        <Button
          fullWidth
          value="go to course"
          onClick={() =>
            navigate(
              `/user/learning/${slug}?enroll=${getEnrollId(
                profile.enrolledCourses,
                courseId
              )}`
            )
          }
        />
      </div>
    );
  }
  return (
    <div className="course-buttons">
      {profile?.cart.includes(courseId) ? (
        <Button
          loading={cartLoading}
          onClick={() => handleNavigation("/user/cart")}
          value="go to cart"
          fullWidth
          size="large"
        />
      ) : (
        <Button
          loading={cartLoading}
          onClick={() => dispatch(addToCart({ _id: courseId }))}
          value="Add to cart"
          fullWidth
          size="large"
        />
      )}
      {profile?.wishlist.includes(courseId) ? (
        <IconButton
          sx={{ border: "2px solid #999" }}
          onClick={() => dispatch(removeFromWishlist({ _id: courseId }))}
        >
          {wishlistLoading ? (
            <CircularProgress size={24} sx={{ color: "#999" }} />
          ) : (
            <BiSolidHeart color="red" />
          )}
        </IconButton>
      ) : (
        <IconButton
          sx={{ border: "2px solid #999" }}
          onClick={() => dispatch(addToWishlist({ _id: courseId }))}
        >
          {wishlistLoading ? (
            <CircularProgress size={24} sx={{ color: "#999" }} />
          ) : (
            <BiHeart color="#999" />
          )}
        </IconButton>
      )}
    </div>
  );
};

export default CourseButtons;
