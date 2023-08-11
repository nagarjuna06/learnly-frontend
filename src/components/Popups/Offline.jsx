import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { Img } from "../FromElements";
import "./popup.css";
import { useEffect } from "react";
import Images from "../Images";
import { projectMode } from "../../utils";
const OfflinePopup = () => {
  const [isOffline, setOffline] = useState(false);
  useEffect(() => {
    if (!projectMode) {
      window.addEventListener("offline", () => setOffline(true));
      window.addEventListener("online", () => setOffline(false));
    }
  }, []);
  return (
    <>
      <Dialog fullScreen open={isOffline}>
        <DialogContent className="offline-content">
          <Img src={Images.offline} />
        </DialogContent>
      </Dialog>
      <Img src={Images.offline} hidden />
    </>
  );
};

export default OfflinePopup;
