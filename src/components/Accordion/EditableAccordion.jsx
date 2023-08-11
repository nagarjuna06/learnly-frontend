import { MdDragIndicator, MdOutlineAddCircleOutline } from "react-icons/md";
import { useState } from "react";
import "./index.css";
import { Button } from "../FromElements";
import { useDispatch, useSelector } from "react-redux";
import {
  createChapter,
  moveChapter,
  moveContent,
} from "../../../redux/slice/instructorSlice";
import ChapterAccordion from "./ChapterAccordion";
import { isAllChaptersFilled } from "../../utils";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const EditableAccordion = () => {
  const dispatch = useDispatch();
  const curriculum = useSelector((state) => state.instructor.curriculum);
  const [expanded, setExpanded] = useState([]);
  const [hide, setHide] = useState(false);
  const handleChange = (index) => (event, newExpanded) => {
    if (newExpanded) {
      setExpanded([...expanded, index]);
    } else {
      const updatedExpandedItems = expanded.filter((id) => id !== index);
      setExpanded(updatedExpandedItems);
    }
  };
  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    setHide(false);
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "content") {
      dispatch(
        moveContent({
          fromDId: source.droppableId,
          toDId: destination.droppableId,
          fromIndex: source.index,
          toIndex: destination.index,
        })
      );
    } else if (type === "chapter") {
      dispatch(
        moveChapter({ fromIndex: source.index, toIndex: destination.index })
      );
    }
  };

  const handleDrag = (result) => {
    setHide(true);
    if (result.type === "content") {
      setExpanded([...Array(curriculum.length).keys()]);
    }
    if (result.type === "chapter") {
      setExpanded([]);
    }
  };
  const handleCollapse = () => {
    if (expanded.length > 0) {
      setExpanded([]);
    } else {
      setExpanded([...Array(curriculum.length).keys()]);
    }
  };
  return (
    <div className="curriculum-list">
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDrag}>
        <div className="collapse-button">
          <p onClick={handleCollapse}>
            {expanded.length > 0 ? "Collapse" : "Expand"} all chapters
          </p>
        </div>
        <Droppable droppableId="CHAPTER" type="chapter">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {curriculum.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      key={chapter.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <div className="curriculum-accordion">
                        <div
                          {...provided.dragHandleProps}
                          title="drag to rearrange the chapters"
                        >
                          <MdDragIndicator className="drag-icon" />
                        </div>
                        <ChapterAccordion
                          chIndex={index}
                          expanded={expanded}
                          setExpanded={setExpanded}
                          chapter={chapter}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isAllChaptersFilled(curriculum) && !hide ? (
        <Button
          value="Add new Chapter"
          variant=""
          startIcon={<MdOutlineAddCircleOutline />}
          onClick={() => dispatch(createChapter())}
          sx={{ marginLeft: "20px" }}
        />
      ) : null}
    </div>
  );
};

export default EditableAccordion;
