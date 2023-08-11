import { useParams } from "react-router-dom";
import SkeltonCourseList from "../../src/components/Cards/SkeltonCourseList";
import CourseList from "../../src/components/Cards/CourseList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../redux/slice/courseSlice";
import { Img } from "../../src/components/FromElements";
import Images from "../../src/components/Images";
import "./index.css";

const CategoriesSearch = () => {
  const { category = "", sub = "" } = useParams();
  const dispatch = useDispatch();
  const { allCourses, loading } = useSelector((state) => state.course);
  useEffect(() => {
    dispatch(
      getAllCourses(
        `?${category ? "category=" + category : ""}${sub ? "&sub=" + sub : ""}`
      )
    );
  }, [category, sub]);
  return (
    <div>
      {loading ? (
        <SkeltonCourseList />
      ) : allCourses.length ? (
        <div id="courses">
          {allCourses.map((each, index) => (
            <CourseList key={index} {...each} />
          ))}
        </div>
      ) : (
        <div className="no-result">
          <Img src={Images.noResults} alt="no-result" />
        </div>
      )}
    </div>
  );
};

export default CategoriesSearch;
