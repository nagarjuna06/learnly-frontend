import { useSelector } from "react-redux";
import Header from "../../../src/components/NavBar/Header";
import { useState } from "react";
import { MdContentCopy, MdOutlineCheck } from "react-icons/md";
import { Tooltip, IconButton } from "@mui/material";
import "../index.css";
const InstructorSettings = () => {
  const [copied, setCopied] = useState(false);
  const profile = useSelector((state) => state.instructor.profile);
  const copyId = () => {
    navigator.clipboard.writeText(profile?.learnlyId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };
  return (
    <div>
      <Header header={"Settings"}></Header>
      <div className="instructor-settings">
        <p>Email:</p>
        <p>{profile?.email}</p>
      </div>
      <div className="instructor-settings">
        <p>No. of Created Courses:</p>
        <h3>{profile?.postedCourses.length}</h3>
      </div>
      <div className="instructor-settings">
        <p>Learnly Id:</p>
        <div>
          <p>{profile?.learnlyId}</p>
          {copied ? (
            <Tooltip title="copied" arrow>
              <IconButton>
                <MdOutlineCheck color="green" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="click to copy" arrow>
              <IconButton onClick={copyId}>
                <MdContentCopy color="#1976d2" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorSettings;
