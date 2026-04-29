import { type ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const pluginScript = document.createElement("script");
    pluginScript.src = "/js/plugins.min.js";
    pluginScript.async = true;

    const functionScript = document.createElement("script");
    functionScript.src = "/js/functions.js";
    functionScript.async = true;

    document.body.appendChild(pluginScript);
    document.body.appendChild(functionScript);

    return () => {
      pluginScript.remove();
      functionScript.remove();
    };
  }, []);

  return (
    <div className="wrap">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
