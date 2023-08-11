/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  MdDragIndicator,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineOndemandVideo,
} from "react-icons/md";
import { AccordionDetails } from "./index";
import ContentForm from "../FromElements/ContentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createContent,
  deleteContent,
  updateContent,
} from "../../../redux/slice/instructorSlice";
import { useState } from "react";
import { IconButton } from "@mui/material";
import VideoPreview from "../Popups/videoPreview";
const ContentAccordion = ({ content, coIndex, chIndex, provided }) => {
  const dispatch = useDispatch();
  const contentLength = useSelector(
    (state) => state.instructor.curriculum[chIndex].contents.length
  );
  const [edit, setEdit] = useState(!content.contentTitle);
  const handleSubmit = (content) => {
    dispatch(updateContent({ chIndex, coIndex, content }));
    setEdit(false);
  };
  const handleDelete = () => {
    const confirmation = confirm("Do you want to delete this content?");

    if (confirmation) {
      dispatch(deleteContent({ chIndex, coIndex, id: content.id }));

      if (contentLength === 1) {
        dispatch(createContent({ chIndex }));
        setEdit(true);
      }
    }
  };
  const handleClose = () => {
    dispatch(deleteContent({ chIndex, coIndex, id: content.id }));
  };
  return (
    <div>
      <AccordionDetails>
        {edit ? (
          <ContentForm
            content={content}
            onSubmit={handleSubmit}
            close={handleClose}
            setEdit={setEdit}
          />
        ) : (
          <div className="content-desc">
            <div>
              <div
                {...provided.dragHandleProps}
                title="drag to rearrange the contents"
              >
                <MdDragIndicator className="drag-icon" />
              </div>
              <MdOutlineOndemandVideo className="content-icon" />

              <VideoPreview
                title={content.contentTitle}
                url={content.embedUrl}
              />
            </div>
            <div>
              <p>{content.duration}</p>
              <IconButton onClick={() => setEdit(true)}>
                <MdOutlineEdit />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <MdOutlineDelete />
              </IconButton>
            </div>
          </div>
        )}
      </AccordionDetails>
    </div>
  );
};

export default ContentAccordion;
