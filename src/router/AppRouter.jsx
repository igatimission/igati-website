import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
// import EcosystemPage from "../pages/EcosystemPage";
// import ProjectsPage from "../pages/ProjectsPage";
// import ProjectDetailsPage from "../pages/ProjectDetailsPage";
// import OpportunitiesPage from "../pages/OpportunitiesPage";
// import OpportunityDetailsPage from "../pages/OpportunityDetailsPage";
// import MarketplacePage from "../pages/MarketplacePage";
// import MarketplaceDetailsPage from "../pages/MarketplaceDetailsPage";
// import LearnPage from "../pages/LearnPage";
// import JoinPage from "../pages/JoinPage";
// import LoginPage from "../pages/LoginPage";
// import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/ecosystem" element={<EcosystemPage />} />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />

        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route
          path="/opportunities/:slug"
          element={<OpportunityDetailsPage />}
        />

        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route
          path="/marketplace/:slug"
          element={<MarketplaceDetailsPage />}
        />

        <Route path="/learn" element={<LearnPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;