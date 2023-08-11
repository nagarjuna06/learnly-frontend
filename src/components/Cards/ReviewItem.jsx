import {
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Rating,
} from "@mui/material";
import CustomAvatarOnly from "../Avatar/CustomAvatar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./index.css";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";
import { timeDiff } from "../../utils";
import { useState } from "react";
const ReviewItem = (props) => {
  const [maxlength, setMaxlength] = useState(200);
  const maximumText = () => setMaxlength(props.review.length);
  const minimumText = () => setMaxlength(200);
  const remain = props.review?.length - maxlength;
  return (
    <div className="review-item">
      <header>
        <div>
          <CustomAvatarOnly
            src={props.user.avatar}
            alt={props.user.name}
            size={50}
          />
          <div>
            <h4>{props.user.name}</h4>
            <div className="rating review-rating">
              <Rating
                readOnly
                value={props.rating}
                size="small"
                precision={0.5}
              />

              <p>{timeDiff(props.createdAt, true)}</p>
            </div>
          </div>
        </div>
        <IconButton>
          <BiDotsVerticalRounded />
        </IconButton>
      </header>
      <div>
        <p>{props.review.slice(0, maxlength)}</p>
        {remain > 0 ? <span onClick={maximumText}>show more</span> : null}
        {remain === 0 ? <span onClick={minimumText}>show less</span> : null}
        <div>
          <p>Helpful?</p>
          <RadioGroup name="helpful" row>
            <FormControlLabel
              value="like"
              control={
                <Radio
                  icon={<MdOutlineThumbUp className="helpful-icon" />}
                  checkedIcon={<MdThumbUp className="helpful-icon" />}
                />
              }
            />
            <FormControlLabel
              value="dislike"
              control={
                <Radio
                  icon={<MdOutlineThumbDown className="helpful-icon" />}
                  checkedIcon={<MdThumbDown className="helpful-icon" />}
                />
              }
            />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
