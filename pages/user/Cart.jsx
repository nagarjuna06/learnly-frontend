import { Button, Img } from "../../src/components/FromElements";
import Images from "../../src/components/Images";
import { useSelector, useDispatch } from "react-redux";
import CircleLoading from "../../src/components/Loading/Circle";
import { useEffect } from "react";
import { checkOut, getCart, logout } from "../../redux/slice/authSlice";
import CartItem from "../../src/components/Cards/CartItem";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, checkOutLoading, profile, cartCourses, guestMode } =
    useSelector((state) => state.auth);
  useEffect(() => {
    if (profile?.cart.length) {
      dispatch(getCart());
    }
  }, [profile]);

  const handleCheckOut = async () => {
    const data = cartCourses.map((each) => ({
      _id: each._id,
      instructorId: each.postedBy._id,
    }));
    if (guestMode) {
      dispatch(logout());
      return;
    }
    const result = await dispatch(checkOut(data));
    if (!result.error) {
      navigate("/user/learning");
    }
  };

  return (
    <div className="wishlist">
      {loading ? (
        <CircleLoading />
      ) : (
        <>
          <h1>Shopping Cart</h1>
          {profile?.cart.length ? (
            <div className="cart-list">
              <div>
                {cartCourses?.map((course, index) => (
                  <CartItem key={index} {...course} />
                ))}
              </div>
              <div className="check-out">
                <h3>Total:</h3>
                <h1>Free</h1>
                <Button
                  fullWidth
                  value="check out"
                  onClick={handleCheckOut}
                  loading={checkOutLoading}
                />
              </div>
            </div>
          ) : (
            <div className="user-img">
              <Img alt="cart" src={Images.cart} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
