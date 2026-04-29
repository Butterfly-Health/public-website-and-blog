import { Link } from "react-router-dom";
import butterflyHealthLogo from "../../assets/logo/butterfly-health-high-resolution-logo-transparent.png";

function Navbar() {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link className="logo" to="/" aria-label="butterfly-health Home">
              <img src={butterflyHealthLogo} alt="butterfly-health" />
            </Link>
            <nav>
              <ul>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/app-features">App Features</Link>
                </li>
              </ul>
            </nav>
            <span className="nav-toggle">Menu</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
