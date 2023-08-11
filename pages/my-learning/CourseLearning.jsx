import { useDispatch, useSelector } from "react-redux";
import CircleLoading from "../../src/components/Loading/Circle";
import { useEffect } from "react";
import {
  courseCurriculum,
  setProgress,
  updateProgress,
} from "../../redux/slice/authSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./index.css";
import CustomizedAccordions from "../../src/components/Accordion";
import CoursePlayer from "../../src/components/VideoPlayer/CoursePlayer";
import RatingPopup from "../../src/components/Popups/RatingPopup";

const CourseLearning = () => {
  const { slug } = useParams();
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { learning, loading, progress, videosData } = useSelector(
    (state) => state.auth
  );
  const enroll = search.get("enroll");

  useEffect(() => {
    if (slug && enroll) {
      dispatch(courseCurriculum({ slug, enroll }));
    } else {
      navigate("/user/learning");
    }
    return () => {
      dispatch(updateProgress());
    };
  }, []);
  useEffect(() => {
    if (!loading && !learning) {
      navigate("/user/learning");
    }
  }, [learning, loading]);
  const handleOnChange = (chId, coId) => {
    const index = videosData.findIndex(
      (each) => each.chId === chId && each.coId === coId
    );
    dispatch(setProgress(index));
  };
  return (
    <div className="wishlist my-learning course-learning">
      {loading || !learning || !videosData.length ? (
        <CircleLoading />
      ) : (
        <>
          <div className="title-rating">
            <h1>{learning?.course?.title}</h1>
            <div className="user-rating-l">
              <RatingPopup size="medium" />
            </div>
          </div>
          <div className="learning-main">
            <CoursePlayer
              {...videosData[progress]}
              coverImage={learning?.course?.coverImage}
            />
            <div className="learning-curriculum">
              <CustomizedAccordions
                curriculum={learning?.course?.curriculum}
                learn
                onChange={handleOnChange}
              />
              <div className="user-rating-s">
                <RatingPopup size="small" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseLearning;
