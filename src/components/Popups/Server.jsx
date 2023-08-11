import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import "./popup.css";
import { Img } from "../FromElements";
import Images from "../Images";
const Server = () => {
  return (
    <Dialog fullScreen open={false}>
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
