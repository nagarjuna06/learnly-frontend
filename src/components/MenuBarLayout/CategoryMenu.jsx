import { Box, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import categories from "../../utils/categories";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CategoryMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNavigate = (path) => {
    navigate(path);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setCurrentIndex(0);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <div>
      <p onClick={handleClick} onMouseOver={handleClick}>
        Categories
      </p>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 30,
              width: 15,
              height: 15,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        sx={{ marginTop: "10px" }}
      >
        <Box sx={{ display: "flex" }}>
          <Box>
            {categories.map((each, index) => (
              <MenuItem
                key={index}
                onMouseOver={() => setCurrentIndex(index)}
                onClick={() => handleNavigate(each.url)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "5px",
                  background: currentIndex === index ? "#eee" : "#fff",
                }}
              >
                <p>{each.title}</p>
                <MdArrowForwardIos />
              </MenuItem>
            ))}
          </Box>
          <Box>
            {categories[currentIndex].subCategories.map((each, index) => (
              <MenuItem key={index} onClick={() => handleNavigate(each.url)}>
                {each.title}
              </MenuItem>
            ))}
          </Box>
        </Box>
      </Menu>
    </div>
  );
};

export default CategoryMenu;
