import { Dialog, DialogContent, IconButton } from "@mui/material";
import "./popup.css";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";

import { resetError } from "../../../redux/slice/errorSlice";
const ErrorPopup = () => {
  const dispatch = useDispatch();
  const { ApplicationError, msg } = useSelector((state) => state.error);
  const handleClose = () => {
    dispatch(resetError());
  };
  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      open={ApplicationError}
      className="error-dialog"
      PaperProps={{ style: { background: "transparent", boxShadow: "none" } }}
    >
      <DialogContent>
        <div className="error-close">
          <IconButton onClick={handleClose}>
            <MdClose color="#fff" size={25} />
          </IconButton>
        </div>
        <div className="error-content">
          <center>
            <p>{msg}</p>
            <br />
            <p>Error fetching data. Please refresh the page.</p>
          </center>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorPopup;
