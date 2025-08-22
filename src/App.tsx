import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { BetaAccessProvider } from '@/contexts/BetaAccessContext';

import { MembershipProvider } from '@/contexts/MembershipContext';
import { FounderProvider } from '@/features/founders/context/FounderContext';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import HomePage from './pages/home/HomePage';
import ProjectsPage from "./pages/projects/ProjectsPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AboutPage from "./pages/AboutPage";
import BetaAccess from "./pages/BetaAccess";
import BlogPage from "./pages/BlogPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import JourneyPage from "./pages/JourneyPage";
import ContributorsPage from "./pages/ContributorsPage";
import BetaTestersPage from "./pages/BetaTestersPage";
import FeaturesPage from "./pages/FeaturesPage";
import TeamPage from "./pages/TeamPage";
import GettingStartedPage from "./pages/help/GettingStartedPage";
import HowItWorksPage from "./pages/help/HowItWorksPage";
import FAQPage from "./pages/help/FAQPage";
import ContactSupportPage from "./pages/help/ContactSupportPage";


import PrivacyPage from "./pages/legal/PrivacyPage";
import TermsPage from "./pages/legal/TermsPage";
import SecurityPage from "./pages/legal/SecurityPage";
import CookiesPage from "./pages/legal/CookiesPage";
import AuthCallback from "./pages/auth/AuthCallback";
import NotFound from "./pages/NotFound";
import FloatingFeedback from "@/components/common/FloatingFeedback";
import ScrollToTop from "@/components/common/ScrollToTop";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import MatchDashboard from "@/components/matching/MatchDashboard";
import MatchingDemoPage from "./pages/MatchingDemoPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardOverviewPage from "./pages/dashboard/DashboardOverviewPage";
import SmartMatchingPage from "./pages/dashboard/SmartMatchingPage";
import CollaborationsPage from "./pages/dashboard/CollaborationsPage";
import LegalTemplatesPage from "./pages/dashboard/LegalTemplatesPage";
import ResourcesPage from "./pages/dashboard/ResourcesPage";
import SkillsPage from "./pages/dashboard/SkillsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BetaAccessProvider>
          <AuthProvider>
            <MembershipProvider>
              <FounderProvider>
                <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Public routes (no access required) */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/journey" element={<JourneyPage />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/contributors" element={<ContributorsPage />} />
                    <Route path="/beta-testers" element={<BetaTestersPage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/cookies" element={<CookiesPage />} />
                    <Route path="/help/getting-started" element={<GettingStartedPage />} />
                    <Route path="/help/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/help/faq" element={<FAQPage />} />
                    <Route path="/help/contact-support" element={<ContactSupportPage />} />
                    
                    {/* Matching System Demo */}
                    <Route path="/matching-demo" element={<MatchingDemoPage />} />
                    
                    {/* Public Projects Page */}
                    <Route path="/projects" element={<ProjectsPage />} />
                    
                    {/* Feature Routes */}
                    <Route path="/matching" element={<div className="min-h-screen bg-background flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Smart Matching</h1>
                        <p className="text-muted-foreground">Advanced matching algorithm coming soon!</p>
                      </div>
                    </div>} />
                    
                    <Route path="/legal" element={<div className="min-h-screen bg-background flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Legal Templates</h1>
                        <p className="text-muted-foreground">Legal templates and agreements coming soon!</p>
                      </div>
                    </div>} />
                    
                    {/* Beta Access */}
                    <Route path="/beta" element={<BetaAccess />} />
                    
                    {/* Redirect /access to beta for simplicity */}
                    <Route path="/access" element={<Navigate to="/beta" replace />} />
                    
                    {/* Catch any old AccessControlPage references */}
                    <Route path="/access-control" element={<Navigate to="/beta" replace />} />
                    
                    {/* Dashboard Layout (Protected) */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<DashboardOverviewPage />} />
                      <Route path="projects" element={<ProjectsPage />} />
                      <Route path="matching" element={<SmartMatchingPage />} />
                      <Route path="matching/swipe" element={<MatchDashboard viewMode="swipe" />} />
                      <Route path="onboarding" element={<OnboardingWizard />} />
                      <Route path="collaborations" element={<CollaborationsPage />} />
                      <Route path="legal" element={<LegalTemplatesPage />} />
                      <Route path="legal/nda" element={<LegalTemplatesPage />} />
                      <Route path="legal/contracts" element={<LegalTemplatesPage />} />
                      <Route path="legal/ip" element={<LegalTemplatesPage />} />
                      <Route path="legal/revenue" element={<LegalTemplatesPage />} />
                      <Route path="resources" element={<ResourcesPage />} />
                      <Route path="resources/guides" element={<ResourcesPage />} />
                      <Route path="resources/templates" element={<ResourcesPage />} />
                      <Route path="resources/tools" element={<ResourcesPage />} />
                      <Route path="skills" element={<SkillsPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Route>
                    

                    

                    
                    {/* Catch-all route redirects to homepage */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                  
                  {/* Scroll to top on route change */}
                  <ScrollToTop />
                  
                  {/* Floating Feedback for Beta Testers */}
                  <FloatingFeedback />
                </BrowserRouter>
              </TooltipProvider>
            </FounderProvider>
          </MembershipProvider>
        </AuthProvider>
        </BetaAccessProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
