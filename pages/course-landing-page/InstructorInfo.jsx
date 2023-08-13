import { MdPeople, MdPlayCircle, MdStar } from "react-icons/md";
import { RiShieldStarFill } from "react-icons/ri";
import CustomAvatarOnly from "../../src/components/Avatar/CustomAvatar";

const InstructorInfo = ({ data }) => {
  return (
    <div className="course-instructor" id="instructor">
      <h2>Instructor</h2>
      <h3>{data?.name}</h3>
      <p>{data?.headline}</p>
      <div className="instructor-highlights">
        <CustomAvatarOnly alt={data?.name} src={data?.avatar} size={120} />
        <div>
          <p>
            <MdStar />
            <span>{parseFloat(data?.rating).toFixed(1)} Instructor rating</span>
          </p>
          <p>
            <RiShieldStarFill />
            <span>
              {data?.reviews} Review{data?.reviews > 1 ? "s" : ""}
            </span>
          </p>
          <p>
            <MdPeople />
            <span>
              {data?.noStudents} Student{data?.noStudents > 1 ? "s" : ""}
            </span>
          </p>
          <p>
            <MdPlayCircle />
            <span>
              {data?.courses} Course{data?.courses > 1 ? "s" : ""}
            </span>
          </p>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.bio }} />
    </div>
  );
};

export default InstructorInfo;
