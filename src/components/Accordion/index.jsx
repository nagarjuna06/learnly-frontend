import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { MdArrowForwardIos, MdOutlineOndemandVideo } from "react-icons/md";
import { useEffect, useState } from "react";
import "./index.css";
import {
  durationString,
  timeFormat,
  timeString,
  totalCurriculum,
} from "../../utils";
import { useSelector } from "react-redux";

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: "100%",
  height: "auto",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<MdArrowForwardIos sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#f7f7f7",
  width: "auto",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  width: "auto",
  zIndex: 1,
  background: "#fff",
}));

const CustomizedAccordions = ({
  curriculum = [],
  duration = "",
  learn = false,
  onChange = () => {},
  viewOnly = false,
}) => {
  const { progress, videosData } = useSelector((state) => state.auth);
  const [expanded, setExpanded] = useState([0]);
  const [maxChapters, setMaxChapters] = useState(learn ? curriculum.length : 5);

  useEffect(() => {
    setExpanded(!viewOnly ? [videosData[progress]?.chId] : [0]);
  }, [progress]);

  const handleChange = (index) => (event, newExpanded) => {
    if (newExpanded) {
      setExpanded([...expanded, index]);
    } else {
      const updatedExpandedItems = expanded.filter((id) => id !== index);
      setExpanded(updatedExpandedItems);
    }
  };

  const handleContentClick = (chId, coId) => {
    onChange(chId, coId);
  };
  const handleCollapse = () => {
    if (expanded.length) {
      setExpanded([]);
    } else {
      setExpanded([...Array(curriculum.length).keys()]);
    }
  };
  const renderLectures = (lectures, chIndex) => {
    return (
      <div>
        {lectures.map((item, index) => (
          <AccordionDetails key={index}>
            <div className="content-desc">
              <div>
                <MdOutlineOndemandVideo className="content-icon" />
                <p
                  className={
                    chIndex === videosData[progress]?.chId &&
                    index === videosData[progress]?.coId
                      ? !viewOnly && "content-active"
                      : "content-inactive"
                  }
                  onClick={() => handleContentClick(chIndex, index)}
                >
                  {item?.contentTitle}
                </p>
              </div>
              {timeFormat(item?.duration)}
            </div>
          </AccordionDetails>
        ))}
      </div>
    );
  };
  const renderChapters = (chapter, index) => {
    const totalChapterItem = chapter.contents?.length;
    const itemText = `lecture${totalChapterItem > 1 ? "s" : ""}`;
    return (
      <Accordion
        expanded={expanded.includes(index)}
        onChange={handleChange(index)}
        TransitionProps={{ unmountOnExit: true }}
        key={index}
      >
        <AccordionSummary>
          <div className="chapter">
            <p className="chapter-title">{chapter?.chapterTitle}</p>
            <div className="chapter-desc">
              <p>
                {totalChapterItem} {itemText}
              </p>
              <p>&#8226; {durationString(chapter?.duration)}</p>
            </div>
          </div>
        </AccordionSummary>
        {chapter?.contents && renderLectures(chapter.contents, index)}
      </Accordion>
    );
  };
  const { lectures, chapters } = totalCurriculum(curriculum);
  const remain = curriculum.length - maxChapters;
  const renderAccordion = () => (
    <div>
      {!learn ? (
        <>
          <h2>Course Content</h2>
          <div className="accordion-info">
            <p>
              {chapters} chapters &#8226; {lectures} lectures &#8226;{" "}
              {timeString(duration)} total length
            </p>
            <div className="collapse-button">
              <p onClick={handleCollapse}>
                {expanded.length > 0 ? "Collapse" : "Expand"} all chapters
              </p>
            </div>
          </div>
        </>
      ) : null}
      {curriculum
        .slice(0, maxChapters)
        .map((chapter, index) => renderChapters(chapter, index))}
      {remain > 0 ? (
        <button
          className="remain-button"
          onClick={() => setMaxChapters(curriculum.length)}
        >
          {remain} more chapter{remain > 1 ? "s" : ""}
        </button>
      ) : null}
    </div>
  );
  return curriculum.length ? renderAccordion() : null;
};

export default CustomizedAccordions;
