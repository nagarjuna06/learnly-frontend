import { Badge, IconButton } from "@mui/material";

const CustomBadge = ({ Icon, count, onClick, ...props }) => {
  return (
    <IconButton onClick={onClick}>
      <Badge
        badgeContent={count}
        max={10}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            fontSize: 10,
            height: 18,
            minWidth: 15,
          },
        }}
      >
        <Icon className="avatar-side-icons" />
      </Badge>
    </IconButton>
  );
};

export default CustomBadge;
