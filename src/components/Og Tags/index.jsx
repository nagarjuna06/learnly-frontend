import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
const OgTags = () => {
  const {
    title = "Learnly",
    description = "",
    image = "https://res.cloudinary.com/myweb1234/image/upload/v1691740694/course-cover_t3suxy.svg",
  } = useSelector((state) => state.og);
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content="https://learn-ly.netlify.app" />
    </Helmet>
  );
};

export default OgTags;
