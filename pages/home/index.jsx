import { useEffect } from "react";
import PromotionCard from "../../src/components/Cards/PromotionCard";
import Footer from "../../src/components/NavBar/Footer";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { getAllCourses } from "../../redux/slice/courseSlice";
import SkeltonCourseList from "../../src/components/Cards/SkeltonCourseList";
import CourseList from "../../src/components/Cards/CourseList";

const Home = () => {
  const dispatch = useDispatch();
  const { allCourses, loading } = useSelector((state) => state.course);
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  return (
    <>
      <PromotionCard />
      {loading ? (
        <SkeltonCourseList />
      ) : (
        <div id="courses">
          {allCourses?.map((each, index) => (
            <CourseList key={index} {...each} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
