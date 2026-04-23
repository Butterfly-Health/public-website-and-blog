import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppTheme from "../shared-theme/AppTheme";
import AppAppBar from "../marketing-page/components/AppAppBar";
import Hero from "../marketing-page/components/Hero";
import LogoCollection from "../marketing-page/components/LogoCollection";
import Highlights from "../marketing-page/components/Highlights";
import Features from "../marketing-page/components/Features";
import Testimonials from "../marketing-page/components/Testimonials";
import Footer from "../marketing-page/components/Footer";
import MainContent from "../blog/components/MainContent";
import Latest from "../blog/components/Latest";
import BlogFooter from "../blog/components/Footer";

function MarketingHomePage() {
  return (
    <>
      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Footer />
      </div>
    </>
  );
}

function BlogPage() {
  return (
    <>
      <AppAppBar isBlogPage />
      <Container
        id="blog"
        maxWidth="lg"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 16,
          gap: 4,
        }}
      >
        <MainContent />
        <Latest />
      </Container>
      <BlogFooter />
    </>
  );
}

function App() {
  const isBlogPage =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/blog");

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      {isBlogPage ? <BlogPage /> : <MarketingHomePage />}
    </AppTheme>
  );
}

export default App;
