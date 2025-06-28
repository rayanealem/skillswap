import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import MainLayout from "components/ui/MainLayout";
// Add your imports here
import LoginRegister from "pages/login-register";
import MessagesChat from "pages/messages-chat";
import UserProfile from "pages/user-profile";
import DashboardHome from "pages/dashboard-home";
import SkillMarketplaceBrowse from "pages/skill-marketplace-browse";
import SkillDetailView from "pages/skill-detail-view";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Auth route without main layout */}
        <Route path="/login-register" element={<LoginRegister />} />
        
        {/* Main application routes with layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="dashboard-home" element={<DashboardHome />} />
          <Route path="skill-marketplace-browse" element={<SkillMarketplaceBrowse />} />
          <Route path="skill-detail-view/:id" element={<SkillDetailView />} />
          <Route path="user-profile/:id?" element={<UserProfile />} />
          <Route path="messages-chat" element={<MessagesChat />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;