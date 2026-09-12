import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import EcosystemPage from "../pages/EcosystemPage";
// import ProjectsPage from "../pages/ProjectsPage";
// import ProjectDetailsPage from "../pages/ProjectDetailsPage";
// import OpportunitiesPage from "../pages/OpportunitiesPage";
// import OpportunityDetailsPage from "../pages/OpportunityDetailsPage";
import MarketplacePage from "../pages/MarketplacePage";
// import MarketplaceDetailsPage from "../pages/MarketplaceDetailsPage";
// import LearnPage from "../pages/LearnPage";
// import JoinPage from "../pages/JoinPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyProfilePage from "../pages/MyProfilePage";
// import NotFoundPage from "../pages/NotFoundPage";


import RegisterOrganisationPage from "../pages/RegisterOrganisationPage";
import MyOrganisationsPage from "../pages/MyOrganisationsPage";
import ManageOrganisationMembersPage from "../pages/ManageOrganisationMembersPage";
import OrganisationProfilePage from "../pages/OrganisationProfilePage";
import CreateOrganisationPostPage from "../pages/CreateOrganisationPostPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />

        {/* <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />

        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route
          path="/opportunities/:slug"
          element={<OpportunityDetailsPage />}
        /> */}

        <Route path="/marketplace" element={<MarketplacePage />} />
        {/* <Route
          path="/marketplace/:slug"
          element={<MarketplaceDetailsPage />}
        /> */}

        {/* <Route path="/learn" element={<LearnPage />} />
        <Route path="/join" element={<JoinPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<MyProfilePage />} />

        <Route path="/organisations/register" element={<RegisterOrganisationPage />}/>
        <Route path="/my-organisations" element={<MyOrganisationsPage />}/>
        <Route path="/my-organisations/:slug/members" element={<ManageOrganisationMembersPage />}/>
        <Route path="/organisations/:slug" element={<OrganisationProfilePage />}/>
        <Route path="/organisations/:slug/posts/create" element={<CreateOrganisationPostPage />}/>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;