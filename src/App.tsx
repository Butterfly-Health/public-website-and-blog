import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./migrated/components/Layout";
import AppFeaturesPage from "./migrated/pages/AppFeaturesPage";
import BlogDetailsPage from "./migrated/pages/BlogDetailsPage";
import BlogListPage from "./migrated/pages/BlogListPage";
import HomePage from "./migrated/pages/HomePage";
import NotFoundPage from "./migrated/pages/NotFoundPage";
import "./migrated/styles/bootstrap-grid.min.css";
import "./migrated/styles/prism.css";
import "./migrated/styles/style.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app-features" element={<AppFeaturesPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
