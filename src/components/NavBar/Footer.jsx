import { Img } from "../FromElements";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import "./index.css";
import { Link } from "react-router-dom";
import Images from "../Images";

const Footer = () => {
  return (
    <footer>
      <div>
        <Img src={Images.logo} className="logo" />
        <div className="footer-list">
          <p>About us</p>
          <p>Contact us</p>
          <p>Teach on learnly</p>
          <p>Terms</p>
          <p>Blog</p>
        </div>
      </div>
      <div>
        <div className="icons-list">
          <Link target="_blank" to="https://www.linkedin.com">
            <BsLinkedin />
          </Link>
          <Link target="_blank" to="https://twitter.com">
            <BsTwitter />
          </Link>
          <Link target="_blank" to="http://instagram.com">
            <BsInstagram />
          </Link>
          <Link target="_blank" to="http://facebook.com">
            <BsFacebook />
          </Link>
          <Link target="_blank" to="http://youtube.com">
            <BsYoutube />
          </Link>
        </div>
        <p className="develop">
          Developed by{" "}
          <Link
            target="_blank"
            to="https://www.linkedin.com/in/nagarjuna-chenna-a56226255"
          >
            Nagarjuna Chenna
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
