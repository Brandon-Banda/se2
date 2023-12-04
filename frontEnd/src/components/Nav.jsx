import { Link } from "react-router-dom";
import "./Nav.css";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          Home
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
