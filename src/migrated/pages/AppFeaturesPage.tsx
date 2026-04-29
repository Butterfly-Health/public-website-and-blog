import { useEffect } from "react";
import { Link } from "react-router-dom";

const appFeatures = [
  {
    title: "Daily Symptom Tracking",
    description:
      "Log fatigue, mood, sleep, and symptoms in under a minute so your trends are easier to spot over time.",
  },
  {
    title: "Personalized Insight Feed",
    description:
      "See context-aware patterns based on your entries, including possible triggers and consistency wins.",
  },
  {
    title: "Medication & Lab Timeline",
    description:
      "Keep dose changes and lab snapshots in one place to make appointments and self-check-ins clearer.",
  },
  {
    title: "Research Notes, Simplified",
    description:
      "Save key takeaways from research and connect them to your personal notes without the information overload.",
  },
  {
    title: "Care Team Friendly Summaries",
    description:
      "Generate concise overviews you can bring into visits to support better conversations with your clinicians.",
  },
  {
    title: "Private By Design",
    description:
      "Your data stays centered on your wellness workflow, with clear controls over what is stored and shared.",
  },
];

function AppFeaturesPage() {
  useEffect(() => {
    document.title = "Butterfly Health App";
  }, []);

  return (
    <main id="app-features">
      <div className="spacer">
        <section className="features-hero mar-top-lg">
          <p className="features-kicker">butterfly-health app</p>
          <h1>Features built for real autoimmune thyroid daily life.</h1>
          <p>
            The Butterfly Health app is being designed to turn symptom notes,
            research context, and wellness habits into practical personalized
            insights.
          </p>
        </section>

        <section className="features-grid mar-top-lg mar-bot-sm">
          {appFeatures.map((feature) => (
            <article className="features-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="features-cta mar-bot-lg">
          <h2>Want updates as features roll out?</h2>
          <p>
            Follow the blog for feature development notes and early wellness app
            updates.
          </p>
          <div className="features-actions">
            <Link to="/blog" className="home-button home-button-primary">
              Go to Blog
            </Link>
            <Link to="/" className="home-button">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AppFeaturesPage;
