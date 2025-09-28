import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import AuthenticationContext from '../../components/ui/AuthenticationContext';
import RecallNotificationBanner from '../../components/ui/RecallNotificationBanner';
import ProductHeader from './components/ProductHeader';
import SupplyChainTimeline from './components/SupplyChainTimeline';
import LocationMap from './components/LocationMap';
import LabReports from './components/LabReports';
import SustainabilityBadges from './components/SustainabilityBadges';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProvenanceReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recallData, setRecallData] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@retailstore.com",
    role: "retailer"
  };

  // Mock product data
  const mockProductData = {
    id: "TUR-2024-0892",
    name: "Organic Turmeric Powder",
    batchId: "TUR-2024-0892",
    packagingDate: "12/15/2024",
    expiryDate: "12/15/2026",
    manufacturer: "AyurVeda Organics Pvt. Ltd.",
    weight: "500g",
    verificationStatus: "verified",
    blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    qrCodeScannedAt: new Date()?.toISOString(),
    totalScans: 47
  };

  // Mock recall data (conditional)
  const mockRecallData = null; // Set to null for no recall, or object for active recall

  useEffect(() => {
    // Simulate loading and data fetching
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get product data from navigation state or use mock
      const scannedProduct = location?.state?.productData || mockProductData;
      
      setUser(mockUser);
      setProductData(scannedProduct);
      setRecallData(mockRecallData);
      setIsLoading(false);
    };

    loadData();
  }, [location?.state]);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleBackToScan = () => {
    navigate('/qr-code-scanner');
  };

  const handleDownloadReport = (reportData = null) => {
    // Simulate PDF download
    const fileName = reportData ? 
      `${reportData?.name || 'certificate'}.pdf` : 
      `provenance-report-${productData?.batchId || 'unknown'}.pdf`;
    
    console.log(`Downloading: ${fileName}`);
    
    // In real implementation, this would trigger actual file download
    alert(`Downloading ${fileName}...`);
  };

  const handleShareReport = () => {
    setShowShareModal(true);
  };

  const handleViewCertificate = (certificate) => {
    console.log('Viewing certificate:', certificate);
    // In real implementation, this would open certificate viewer or download
    alert(`Opening certificate: ${certificate?.name}`);
  };

  const handleRecallDismiss = () => {
    setRecallData(null);
  };

  const handleRecallDetails = (recall) => {
    console.log('Viewing recall details:', recall);
    // In real implementation, this would navigate to detailed recall page
    alert('Opening detailed recall information...');
  };

  const shareOptions = [
    { id: 'email', label: 'Email', icon: 'Mail' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
    { id: 'copy', label: 'Copy Link', icon: 'Copy' },
    { id: 'qr', label: 'QR Code', icon: 'QrCode' }
  ];

  const handleShare = (method) => {
    const reportUrl = `${window.location?.origin}/provenance-report?batch=${productData?.batchId}`;
    
    switch (method) {
      case 'email':
        window.open(`mailto:?subject=Product Verification Report&body=View the provenance report: ${reportUrl}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=Product Verification Report: ${reportUrl}`);
        break;
      case 'copy':
        navigator.clipboard?.writeText(reportUrl);
        alert('Link copied to clipboard!');
        break;
      case 'qr': alert('QR code sharing feature would be implemented here');
        break;
      default:
        break;
    }
    setShowShareModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        <AuthenticationContext user={user} onLogout={handleLogout} />
        <WorkflowBreadcrumb currentStep="report" productData={productData} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Verifying Product Authenticity
                </h2>
                <p className="text-muted-foreground">
                  Blockchain verification in progress...
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        <AuthenticationContext user={user} onLogout={handleLogout} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="AlertTriangle" size={32} className="text-error" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  No Product Data Found
                </h2>
                <p className="text-muted-foreground">
                  Please scan a QR code to view the provenance report.
                </p>
              </div>
              <Button
                variant="default"
                iconName="QrCode"
                iconPosition="left"
                iconSize={16}
                onClick={handleBackToScan}
                className="transition-smooth"
              >
                Scan QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <AuthenticationContext user={user} onLogout={handleLogout} />
      {recallData && (
        <RecallNotificationBanner
          recallData={recallData}
          onDismiss={handleRecallDismiss}
          onViewDetails={handleRecallDetails}
        />
      )}
      <WorkflowBreadcrumb 
        currentStep="report" 
        productData={productData}
        onBack={handleBackToScan}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        <ProductHeader
          productData={productData}
          onDownloadReport={handleDownloadReport}
          onShareReport={handleShareReport}
          onBackToScan={handleBackToScan}
        />

        {/* Supply Chain Timeline */}
        <SupplyChainTimeline />

        {/* Location Map & Farmer Profile */}
        <LocationMap />

        {/* Lab Reports */}
        <LabReports onDownloadReport={handleDownloadReport} />

        {/* Sustainability Badges */}
        <SustainabilityBadges onViewCertificate={handleViewCertificate} />

        {/* Blockchain Verification Footer */}
        <div className="bg-card border border-border rounded-lg p-6 card-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  Blockchain Verified
                </h3>
                <p className="text-sm text-muted-foreground">
                  This report is secured and verified on the blockchain
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Verification Hash</p>
              <p className="font-data text-xs text-primary">
                {productData?.blockchainHash?.substring(0, 20)}...
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md modal-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">
                Share Report
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconSize={16}
                onClick={() => setShowShareModal(false)}
              />
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Share this provenance report with others
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {shareOptions?.map((option) => (
                <Button
                  key={option?.id}
                  variant="outline"
                  iconName={option?.icon}
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => handleShare(option?.id)}
                  className="justify-start transition-smooth"
                >
                  {option?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvenanceReport;