import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-center h-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 lg:px-44">
      <Link to="/buy" className="px-5">
        <p>Pricing</p>
      </Link>
      <Link to="/about">
        <p>About Us</p>
      </Link>
    </div>
  );
};

export default Footer;
