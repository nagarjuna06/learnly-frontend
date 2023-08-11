import { SwiperSlide } from "swiper/react";
import CourseCardSkelton from "../Skelton/CourseCardSkelton";
import CourseSwiper from "../Swiper";
import { Skeleton } from "@mui/material";

const SkeltonCourseList = () => {
  return [...Array(4).keys()].map((each) => (
    <div key={each}>
      <Skeleton
        animation="wave"
        width="60%"
        sx={{ marginLeft: "20px" }}
        height={50}
      />
      <CourseSwiper>
        {[...Array(5).keys()].map((each) => (
          <SwiperSlide
            key={each}
            style={{
              padding: "3px",
            }}
          >
            <CourseCardSkelton />
          </SwiperSlide>
        ))}
      </CourseSwiper>
    </div>
  ));
};

export default SkeltonCourseList;
