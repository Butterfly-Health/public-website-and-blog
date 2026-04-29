import { useState, type FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import phoneModel from "../../assets/phone-model.png";

function HomePage() {
  const [newsletterStatus, setNewsletterStatus] = useState("");

  useEffect(() => {
    document.title = "Butterfly Health";
  }, []);

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus("Subscribing...");

    const form = event.currentTarget;
    const email = new FormData(form).get("email") as string;

    try {
      const response = await fetch(
        "http://localhost:3001/api/newsletter/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setNewsletterStatus(
          data.error || "Failed to subscribe. Please try again.",
        );
        return;
      }

      setNewsletterStatus(
        data.message ||
          "Thanks for signing up! Check your email for confirmation.",
      );
      form.reset();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setNewsletterStatus(
        "Connection error. Please check your email or try again later.",
      );
    }
  };

  return (
    <main id="home">
      <div className="spacer">
        <section className="home-hero mar-top-lg">
          <div className="home-hero-copy">
            <p className="home-kicker">butterfly-health</p>
            <h1>Going beyond the diagnosis.</h1>
            <p className="home-lead">
              Butterfly Health aims to improve the quality of knowledge for
              thyroid disease patients by making research studies easily
              understandable. We are also building a mobile app to help make
              tracking and understanding the condition easier.
            </p>
            <div className="home-actions">
              <Link to="/blog" className="home-button home-button-primary">
                Read the Blog
              </Link>
              <Link
                to="/app-features"
                className="home-button home-button-secondary"
              >
                See App Features
              </Link>
            </div>

            <section className="newsletter-signup newsletter-signup-inline">
              <form
                className="newsletter-form"
                onSubmit={handleNewsletterSubmit}
              >
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  className="home-button home-button-primary newsletter-button"
                >
                  Sign Up for Our Newsletter
                </button>
              </form>
              {newsletterStatus && (
                <p
                  className="newsletter-status"
                  role="status"
                  aria-live="polite"
                >
                  {newsletterStatus}
                </p>
              )}
            </section>
          </div>

          <div className="home-hero-panel">
            <p className="home-panel-label">Mobile mockup</p>
            <div className="home-phone-mockup" aria-label="Mobile app mockup">
              <img
                src={phoneModel}
                alt="Butterfly Health app preview"
                className="home-phone-image"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
