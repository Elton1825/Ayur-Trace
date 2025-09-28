import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import QRCodeScanner from './pages/qr-code-scanner';
import LoginPage from './pages/login';
import ProvenanceReport from './pages/provenance-report';
import RetailerDashboard from './pages/retailer-dashboard';
import ConsumerDashboard from './pages/consumer-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/qr-code-scanner" element={<QRCodeScanner />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/provenance-report" element={<ProvenanceReport />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;