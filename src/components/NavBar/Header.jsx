import "./index.css";

const Header = ({ header, children }) => {
  return (
    <div className="instructor-header">
      <h1>{header}</h1>
      {children}
    </div>
  );
};

export default Header;
