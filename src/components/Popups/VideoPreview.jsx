import { Dialog, DialogContent, Tooltip, IconButton } from "@mui/material";
import ReactPlayer from "react-player";
import { MdClose } from "react-icons/md";
import "./popup.css";
import { useState } from "react";
import Images from "../Images";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer";
const VideoPreview = ({ url, title }) => {
  const coverImage = useSelector((state) => state.instructor.course.coverImage);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Tooltip
        title={`Click to preview of ${title} video`}
        arrow
        placement="right-end"
      >
        <p className="content-name" onClick={handleOpen}>
          {title}
        </p>
      </Tooltip>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogContent>
          <div className="close-icon-div">
            <IconButton onClick={handleClose}>
              <MdClose className="close-icon" />
            </IconButton>
            <p>{title}</p>
          </div>
          <VideoPlayer url={url} thumbnail={coverImage} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoPreview;
