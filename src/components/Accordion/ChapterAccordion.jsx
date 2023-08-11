/* eslint-disable react/prop-types */
import { MdOutlineAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import ChapterForm from "../FromElements/ChapterForm";
import { Accordion, AccordionDetails, AccordionSummary } from "./index";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createContent,
  deleteChapter,
  updateChapter,
} from "../../../redux/slice/instructorSlice";
import { getTotalDuration, isAllContentsFilled } from "../../utils";
import ContentAccordion from "./ContentAccordion";
import { Button } from "../FromElements";
import { Draggable, Droppable } from "react-beautiful-dnd";

const ChapterAccordion = ({
  chapter,
  expanded,
  setExpanded,
  chIndex,
  handleChange,
}) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(!chapter.chapterTitle);

  const handleDelete = () => {
    const confirmation = confirm("Do you want to delete this chapter?");
    if (confirmation) {
      dispatch(deleteChapter({ id: chapter.id }));
    }
  };
  const handleClose = () => {
    dispatch(deleteChapter({ id: chapter.id }));
  };

  const handleSubmit = (chapterTitle) => {
    let newChapter = { ...chapter };
    newChapter.chapterTitle = chapterTitle;
    dispatch(updateChapter({ chapter: newChapter, chIndex }));
    if (!chapter.contents.length) {
      dispatch(createContent({ chIndex }));
    }
    setEdit(false);
    setExpanded([chIndex]);
  };

  const totalChapterItem = chapter.contents?.length;
  const itemText = `lecture${totalChapterItem > 1 ? "s" : ""}`;
  return (
    <Accordion
      expanded={expanded.includes(chIndex)}
      onChange={handleChange(chIndex)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary className="curriculum-accordion-summary">
        {edit ? (
          <ChapterForm
            value={chapter.chapterTitle}
            onSubmit={handleSubmit}
            close={handleClose}
            setEdit={setEdit}
          />
        ) : (
          <div className="accordion-header">
            <div className="chapter-desc-edit">
              <p className="chapter-title">{chapter.chapterTitle}</p>
              <div>
                <p>
                  {totalChapterItem} {itemText}
                </p>
                <p>&#8226; {getTotalDuration(chapter.contents)}</p>
              </div>
            </div>
            <div>
              <IconButton onClick={() => setEdit(true)}>
                <MdOutlineEdit />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <MdOutlineDelete />
              </IconButton>
            </div>
          </div>
        )}
      </AccordionSummary>
      <Droppable droppableId={chapter.id} type="content">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapter.contents.map((content, coIndex) => (
              <Draggable
                key={content.id}
                draggableId={content.id}
                index={coIndex}
              >
                {(provided) => (
                  <div {...provided.draggableProps} ref={provided.innerRef}>
                    <ContentAccordion
                      content={content}
                      coIndex={coIndex}
                      chIndex={chIndex}
                      id={chapter.id}
                      provided={provided}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isAllContentsFilled(chapter.contents) ? (
        <AccordionDetails>
          <Button
            value="add new content"
            onClick={() => dispatch(createContent({ chIndex }))}
            startIcon={<MdOutlineAdd />}
            variant=""
          />
        </AccordionDetails>
      ) : null}
    </Accordion>
  );
};

export default ChapterAccordion;
