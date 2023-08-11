import { Rating } from "@mui/material";
import { MdStar } from "react-icons/md";
import { Link } from "react-router-dom";

const CustomRating = ({
  readOnly = false,
  value = 0,
  size = "meduim",
  reviews = 0,
  no = -1,
  stu = false,
  color = "",
}) => {
  return !!value ? (
    <div className="rating">
      <h4>{parseFloat(value).toFixed(1)}</h4>
      <Rating
        size={size}
        defaultValue={value}
        precision={0.5}
        readOnly={readOnly}
        sx={{ color: "#f69c08" }}
        emptyIcon={
          <MdStar style={{ opacity: 0.55, color: color }} fontSize="inherit" />
        }
      />

      {no === -1 ? null : stu ? (
        <p>
          <a className="course-link" href="#reviews">
            ({reviews})
          </a>{" "}
          &nbsp;{no.toLocaleString()} Student{no > 1 ? "s" : ""}
        </p>
      ) : (
        <p>({no.toLocaleString()})</p>
      )}
    </div>
  ) : null;
};

export default CustomRating;
