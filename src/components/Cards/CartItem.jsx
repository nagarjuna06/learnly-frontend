import { useDispatch } from "react-redux";
import { timeToString } from "../../utils";
import { Img } from "../FromElements";
import Images from "../Images";
import { removeFromCart } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="cart-item">
      <div onClick={() => navigate(`/course/${props?.slug}`)}>
        <Img src={props?.coverImage || Images.videoThumbnail} alt="course" />
        <div className="cart-item-content">
          <div>
            <Tooltip title={props?.title} arrow>
              <h3>{props?.title}</h3>
            </Tooltip>

            <p>{props?.postedBy.name}</p>
          </div>
          <div>
            <p>{timeToString(props?.duration)}</p>
            <p>|</p>
            <p>{props.level}</p>
          </div>
          <div>
            <span>{props?.pricing}</span>
          </div>
        </div>
      </div>
      <p onClick={() => dispatch(removeFromCart({ _id: props?._id }))}>
        Remove
      </p>
    </div>
  );
};

export default CartItem;
