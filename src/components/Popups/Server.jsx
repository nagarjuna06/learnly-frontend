import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import "./popup.css";
import { Img } from "../FromElements";
import Images from "../Images";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { startTheServer } from "../../../redux/slice/errorSlice";
const Server = () => {
  const dispatch = useDispatch();
  const { serverStarted } = useSelector((state) => state.error);
  useEffect(() => {
    dispatch(startTheServer());
  }, []);
  return (
    <Dialog fullScreen open={!serverStarted}>
      <DialogContent>
        <div className="server-popup">
          <div>
            <Img src={Images.logoIcon} alt="logo-icon" />
            <CircularProgress size={70} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Server;
