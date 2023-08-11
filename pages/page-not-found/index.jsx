import { Link } from "react-router-dom";
import { Button, Img } from "../../src/components/FromElements";
import Images from "../../src/components/Images";
import "./index.css";
const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <Img src={Images.pageNotFound} />
      <Link to="/">
        <Button value="back to home" size="small" />
      </Link>
    </div>
  );
};

export default PageNotFound;
