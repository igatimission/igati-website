import { Outlet } from "react-router-dom";

import TopBanner from "../components/layout/TopBanner";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBanner />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;