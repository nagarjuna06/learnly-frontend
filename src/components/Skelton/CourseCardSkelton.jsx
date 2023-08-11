import { Box, Grid, Skeleton } from "@mui/material";

const CourseCardSkelton = () => {
  return (
    <Grid container wrap="nowrap">
      <Box sx={{ width: 300, margin: 3 }}>
        <Skeleton
          variant="rectangular"
          height={180}
          width={290}
          animation="wave"
        />
        <Skeleton animation="wave" />
        <Skeleton width="60%" animation="wave" />
      </Box>
    </Grid>
  );
};

export default CourseCardSkelton;
