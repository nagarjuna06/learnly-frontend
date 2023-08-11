/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import CustomRating from "../../src/components/FromElements/CustomRating";
import "./index.css";
import { PiGlobeBold, PiSealWarningFill } from "react-icons/pi";
import { dateFormat, getLanguageNative, timeToString } from "../../src/utils";
import {
  MdAllInclusive,
  MdNavigateNext,
  MdOndemandVideo,
  MdTipsAndUpdates,
} from "react-icons/md";
import Images from "../../src/components/Images";
import { BiMobile } from "react-icons/bi";
import VideoPlayer from "../../src/components/VideoPlayer";
import { getUrl } from "../../src/utils/categories";
import CourseButtons from "../../src/components/FromElements/CourseButtons";

const CourseInfo = ({
  _id,
  title,
  subtitle,
  category,
  subCategory,
  postedBy = null,
  language = "English",
  createdAt,
  updatedAt,
  coverImage,
  previewMedia,
  rating,
  enrolledNo,
  duration,
  noReviews = 0,
  slug,
}) => {
  const urls = getUrl({
    category,
    sub: subCategory,
  });

  return (
    <div className="course-info-main">
      <div className="course-info">
        <div className="course-navigation">
          <Link to="/">Home</Link>
          <MdNavigateNext />
          <Link to={urls?.categoryUrl}>{category}</Link>
          <MdNavigateNext />
          <Link to={urls?.subUrl}>{subCategory}</Link>
        </div>
        <div className="course-preview-s">
          <VideoPlayer url={previewMedia} thumbnail={coverImage} />
        </div>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        <CustomRating
          value={rating}
          reviews={noReviews}
          no={enrolledNo}
          stu
          readOnly
          color="#aaa"
        />
        {postedBy?.name ? (
          <p>
            Created by{" "}
            <a className="course-link" href="#instructor">
              {postedBy?.name}
            </a>
          </p>
        ) : null}
        <div className="course-info-div">
          <p>
            <PiSealWarningFill />
            <span>Last updated {dateFormat(updatedAt, "n")}</span>
          </p>
          <p>
            <PiGlobeBold />
            <span>{getLanguageNative(language)}</span>
          </p>
        </div>
        <div className="add-wish-btns">
          {postedBy?.name ? <CourseButtons courseId={_id} slug={slug} /> : null}
        </div>
      </div>
      <div className="course-preview-l">
        <VideoPlayer url={previewMedia} thumbnail={coverImage} />
        <RenderIncludes hrs={timeToString(duration)} />
        <div className="button-div">
          {postedBy?.name ? <CourseButtons courseId={_id} slug={slug} /> : null}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;

export const RenderIncludes = ({ className, hrs }) => {
  return (
    <div className={`course-includes ${className}`}>
      <h3>This Course Includes:</h3>
      <p>
        <MdOndemandVideo /> <span>{hrs} on-demand video</span>
      </p>
      <p>
        <BiMobile />
        <span>Access on mobile and TV</span>
      </p>
      <p>
        <MdAllInclusive />
        <span>Full lifetime access</span>
      </p>
    </div>
  );
};
