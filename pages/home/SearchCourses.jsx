import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Img } from "../../src/components/FromElements";
import Images from "../../src/components/Images";
import "./index.css";
import SkeltonCourseList from "../../src/components/Cards/SkeltonCourseList";
import CourseItem from "../../src/components/Cards/CourseItem";
import { getAllCourses } from "../../redux/slice/courseSlice";
const SearchCourses = () => {
  const [search, setSearch] = useSearchParams();
  const dispatch = useDispatch();
  const { allCourses, loading } = useSelector((state) => state.course);
  useEffect(() => {
    dispatch(
      getAllCourses(
        `?slug=${search.get("q").replaceAll(" ", "-").toLowerCase()}`
      )
    );
  }, [search]);
  useEffect(() => {}, []);

  return (
    <div>
      {loading || !allCourses ? (
        <SkeltonCourseList />
      ) : allCourses.length ? (
        <div className="search-courses">
          <h1>
            {allCourses.length} result{allCourses.length > 1 ? "s" : ""} for
            &quot;
            {search.get("q")}&quot;
          </h1>
          <div>
            {allCourses.map((each, index) => (
              <CourseItem key={index} {...each} />
            ))}
          </div>
        </div>
      ) : (
        <div className="user-img">
          <Img src={Images.noResults} alt="no-result" />
        </div>
      )}
    </div>
  );
};

export default SearchCourses;
