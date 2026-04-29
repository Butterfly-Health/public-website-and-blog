import { Link } from "react-router-dom";
import butterflyHealthLogo from "../../assets/logo/butterfly-health-high-resolution-logo-transparent.png";

function Footer() {
  return (
    <footer className="mar-top-lg">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-3 col-sm-12">
            <Link to="/" className="logo" aria-label="butterfly-health Home">
              <img src={butterflyHealthLogo} alt="butterfly-health" />
            </Link>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="footer-contacts">
              <div className="wrap">
                <a className="email" href="mailto:hello@butterfly-health.com">
                  hello@butterfly-health.com
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="social-links">
              <ul>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://www.facebook.com/butterfly1health">
                    Facebook
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://www.reddit.com/user/LividBath/">
                    Reddit
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://discord.gg/U74fDNKwuM">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
