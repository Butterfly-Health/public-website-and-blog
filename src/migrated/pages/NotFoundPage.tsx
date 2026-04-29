import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate("/", { replace: true });
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <main className="custom-pad">
      <div className="container">
        <div className="mar-top-lg">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="mar-bot-xs">
                <div className="page-content-image">
                  <img src="/img/error404.jpg" alt="Error" />
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1 col-md-10">
              <div className="page-content">
                <h1>404!</h1>
                <p className="lead">Seems like you are lost.</p>
                <h2>
                  Lets get you <Link to="/">Home</Link>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
