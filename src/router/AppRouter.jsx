import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import OrganisationAdminLayout from "../layouts/OrganisationAdminLayout";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import EcosystemPage from "../pages/EcosystemPage";
import ImpactMediaPage from "../pages/ImpactMediaPage";
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
import OrganisationWorkspacePage from "../pages/OrganisationWorkspacePage";

import ApicultureProgrammePage from "../pages/ApicultureProgrammePage";


// import OrganisationDashboardPage from "../pages/OrganisationDashboardPage";

import DashboardHomePage from "../pages/organisation_admin/OrganizationDashboard";
import MembershipRequestsPage from "../pages/organisation_admin/OrganisationMembership";
import OrganisationPostsPage from "../pages/organisation_admin/OrganisationPosts";
import OrganisationProjectsPage from "../pages/organisation_admin/OrganisationProjects";
import OrganisationOpportunitiesPage from "../pages/organisation_admin/OrganisationOpportunities";
import OrganisationSettingsPage from "../pages/organisation_admin/OrganisationSettings";
import OrganisationNotFoundPage from "../pages/organisation_admin/OrganisationNotFound";



const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/impact-media" element={<ImpactMediaPage />}/>

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
        <Route path="/organisation-workspace" element={<OrganisationWorkspacePage />}/>
        <Route path="/ecosystem/apiculture" element={<ApicultureProgrammePage />}/>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>

      {/* <Route path="/organisations/:slug/dashboard" element={<OrganisationDashboardPage />}/> */}

      <Route path="/organisations/:slug/dashboard" element={<OrganisationAdminLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="members" element={<MembershipRequestsPage />} />
          <Route path="posts" element={<OrganisationPostsPage />} />
          <Route path="projects" element={<OrganisationProjectsPage />} />
          <Route path="opportunities" element={<OrganisationOpportunitiesPage />} />
          <Route path="settings" element={<OrganisationSettingsPage />} />
          <Route path="*" element={<OrganisationNotFoundPage />} />
      </Route>


    </Routes>
  );
};

export default AppRouter;