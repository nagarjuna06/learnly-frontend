import { MdClose, MdEdit, MdStar } from "react-icons/md";
import { Button, CustomInput, Img } from "../FromElements";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useState } from "react";
import Images from "../Images";
import HoverRating from "../FromElements/HoverRating";
import { useSelector, useDispatch } from "react-redux";
import {
  courseCurriculum,
  newReview,
  updateReview,
} from "../../../redux/slice/authSlice";

const RatingPopup = ({ size = "" }) => {
  const { learning, ratingLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const edit = "review" in learning;
  const [open, setOpen] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    formData["courseId"] = learning.course._id;
    formData["instructorId"] = learning.course.postedBy._id;
    formData["enroll"] = learning._id;
    let result;
    if (edit) {
      result = await dispatch(
        updateReview({ ...formData, reviewId: learning.review._id })
      );
    } else {
      result = await dispatch(newReview(formData));
    }
    if (result?.meta?.requestStatus === "fulfilled") {
      setIsReviewed(true);
    }
  };
  const handleReview = () => {
    dispatch(
      courseCurriculum({ enroll: learning._id, slug: learning.course.slug })
    );
  };

  return (
    <div>
      <Button
        size={size}
        onClick={handleOpen}
        startIcon={edit ? <MdEdit /> : <MdStar />}
        sx={{
          padding: "5px 10px",
        }}
        value={edit ? "Edit your Rating" : "Leave a Rating"}
      />
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogContent>
          <div className="rating-popup">
            {isReviewed ? null : (
              <div className="error-close">
                <IconButton onClick={handleClose}>
                  <MdClose />
                </IconButton>
              </div>
            )}
            <div className="rating-popup-content">
              <Img alt="rating" src={Images.review} />
              {isReviewed ? (
                <form>
                  <h2>Thanks for your Review!</h2>
                  <Button value="go back" size={size} onClick={handleReview} />
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2>Why did you leave this rating?</h2>
                  <HoverRating
                    defaultValue={edit ? learning.review.rating : null}
                    size={size}
                  />
                  <CustomInput
                    name="review"
                    multiline
                    rows={5}
                    value={edit ? learning.review.review : ""}
                    fullWidth
                    placeholder="Tell us about your own personal experience taking this course.Was it a good match for you?"
                  />
                  <Button
                    type="submit"
                    value="save and continue"
                    size={size}
                    loading={ratingLoading}
                  />
                </form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RatingPopup;
