import { MdArrowBack, MdClose, MdSearch } from "react-icons/md";
import CustomBadge from "../Badge";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import SearchInput from "../FromElements/SearchInput";
import "./popup.css";
import { useNavigate } from "react-router-dom";
import { Img } from "../FromElements";
import Images from "../Images";
const SearchPopup = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    navigate(`courses/search?q=${formData.search}`);
    setOpen(false);
  };
  const handleDeviceWidth = () => {
    setDeviceWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleDeviceWidth);
    return () => {
      window.removeEventListener("resize", handleDeviceWidth);
    };
  }, []);
  if (window.innerWidth > 1020) {
    return null;
  }
  return (
    <div>
      <div className="search-button">
        <CustomBadge Icon={MdSearch} onClick={handleOpen} />
      </div>
      <Dialog
        onClose={handleClose}
        fullScreen
        open={open}
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            boxShadow: "none",
            padding: 0,
          },
        }}
      >
        <DialogContent>
          <div className="search-popup">
            <form className="search-popup-form" onSubmit={handleSubmit}>
              <CustomBadge Icon={MdArrowBack} onClick={handleClose} />
              <SearchInput size="small" autoFocus />
            </form>
            <div>
              <Img src={Images.logoIcon} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchPopup;
