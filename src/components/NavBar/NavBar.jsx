import { Link, useNavigate, useParams } from "react-router-dom";
import CustomAvatar from "../Avatar";
import CustomBadge from "../Badge";
import { Img } from "../FromElements";
import SearchInput from "../FromElements/SearchInput";
import "./index.css";
import { BiHeart } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import Images from "../Images";
import CategoryMenu from "../MenuBarLayout/CategoryMenu";
import SearchPopup from "../Popups/SearchPopup";

const NavBar = () => {
  const { profile } = useSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    navigate(`courses/search?q=${formData.search}`);
  };
  const wLen = profile ? profile.wishlist.length : 0;
  const cLen = profile ? profile.cart.length : 0;
  return (
    <nav className={params?.slug ? "relative" : null}>
      <div className="filter-section">
        <Link to="/">
          <Img className="app-bar-img" src={Images.logo} alt="image" />
        </Link>
        <CategoryMenu />
      </div>
      <form className="search-input-form" onSubmit={handleSubmit}>
        <SearchInput />
      </form>
      <div className="btn-section">
        {profile?.role === "Instructor" ? (
          <Link to="/instructor">
            <p>Instructor</p>
          </Link>
        ) : null}
        <Link to="user/learning">
          <p>My Learning</p>
        </Link>
        <SearchPopup />
        <Link to="/user/wishlist">
          <CustomBadge count={wLen} Icon={BiHeart} />
        </Link>
        <Link to="/user/cart">
          <CustomBadge count={cLen} Icon={MdOutlineShoppingCart} />
        </Link>
        <CustomAvatar />
      </div>
    </nav>
  );
};

export default NavBar;
