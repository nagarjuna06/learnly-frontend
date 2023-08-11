import { Link } from "react-router-dom";
import { Button, Img } from "../../src/components/FromElements";
import Images from "../../src/components/Images";
import "./index.css";
const DeviceCompact = () => {
  return (
    <div className="page-not-found">
      <Img src={Images.DeviceCompact} />
      <Link to="/">
        <Button value="back to home" size="small" />
      </Link>
    </div>
  );
};

export default DeviceCompact;
