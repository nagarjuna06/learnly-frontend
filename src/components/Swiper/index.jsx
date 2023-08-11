import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./index.css";

const CourseSwiper = ({ children }) => {
  return (
    <div>
      <Swiper
        breakpoints={{
          500: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default CourseSwiper;
