/* eslint-disable react/prop-types */
import { SwiperSlide } from "swiper/react";
import CourseSwiper from "../Swiper";
import CourseItem from "./CourseItem";
import "./index.css";

const CourseList = ({ title, courses }) => {
  return (
    <div className="course-list">
      <h2>{title} Courses</h2>
      <div>
        <CourseSwiper>
          {courses?.map((eachCourse, index) => (
            <SwiperSlide
              key={index}
              style={{
                padding: "0px 14px ",
              }}
            >
              <CourseItem {...eachCourse} />
            </SwiperSlide>
          ))}
        </CourseSwiper>
      </div>
    </div>
  );
};

export default CourseList;
