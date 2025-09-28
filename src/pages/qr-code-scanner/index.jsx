import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import AuthenticationContext from '../../components/ui/AuthenticationContext';
import RecallNotificationBanner from '../../components/ui/RecallNotificationBanner';

// Component imports
import CameraInterface from './components/CameraInterface';
import ImageUploadZone from './components/ImageUploadZone';
import ScanModeToggle from './components/ScanModeToggle';
import ScanHistory from './components/ScanHistory';
import ManualCodeEntry from './components/ManualCodeEntry';
import ScanningProgress from './components/ScanningProgress';

const QRCodeScanner = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Sarah Johnson",
    role: "retailer",
    email: "sarah.johnson@retailstore.com"
  });

  // Scanner state
  const [scanMode, setScanMode] = useState('camera');
  const [isScanning, setIsScanning] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Recall notification state
  const [recallNotification] = useState({
    severity: 'medium',
    message: 'Product recall issued for Batch BTH-2024-089. Check your inventory for affected items.',
    affectedProducts: 3,
    details: {
      reason: 'Potential contamination detected during quality testing',
      batchIds: ['BTH-2024-089', 'BTH-2024-090'],
      dateIssued: '2024-12-05'
    },
    contactInfo: {
      phone: '+1-800-555-0123'
    }
  });

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i?.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScanSuccess = (data) => {
    setScanData(data);
    setShowProgress(true);
    setIsScanning(false);
  };

  const handleScanError = (error) => {
    console.error('Scan error:', error);
    // Handle error display
  };

  const handleProgressComplete = (data) => {
    setShowProgress(false);
    // Navigate to provenance report with scan data
    navigate('/provenance-report', { state: { scanData: data } });
  };

  const handleProgressCancel = () => {
    setShowProgress(false);
    setScanData(null);
  };

  const handleModeChange = (mode) => {
    setScanMode(mode);
    setIsScanning(mode === 'camera');
  };

  const handleHistorySelect = (scan) => {
    navigate('/provenance-report', { state: { scanData: scan } });
  };

  const handleManualCodeSubmit = (data) => {
    setShowManualEntry(false);
    handleScanSuccess(data);
  };

  const handleBack = () => {
    navigate('/retailer-dashboard');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <AuthenticationContext user={user} onLogout={handleLogout} />
      <WorkflowBreadcrumb 
        currentStep="scan" 
        productData={scanData}
        onBack={handleBack}
      />
      <RecallNotificationBanner 
        recallData={recallNotification}
        onViewDetails={() => console.log('View recall details')}
        onDismiss={() => console.log('Dismiss recall')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="QrCode" size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            QR Code Scanner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scan product QR codes to verify authenticity and view complete supply chain information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Scanner Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mode Toggle */}
            <ScanModeToggle
              currentMode={scanMode}
              onModeChange={handleModeChange}
              isMobile={isMobile}
            />

            {/* Scanner Interface */}
            <div className="bg-card rounded-lg border border-border p-6">
              {scanMode === 'camera' ? (
                <CameraInterface
                  onScanSuccess={handleScanSuccess}
                  onError={handleScanError}
                  isActive={isScanning}
                />
              ) : (
                <ImageUploadZone
                  onScanSuccess={handleScanSuccess}
                  onError={handleScanError}
                  isActive={scanMode === 'upload'}
                />
              )}
            </div>

            {/* Alternative Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowManualEntry(true)}
                iconName="Keyboard"
                iconPosition="left"
              >
                Enter Code Manually
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setShowHistory(!showHistory)}
                iconName="History"
                iconPosition="left"
              >
                {showHistory ? 'Hide' : 'Show'} Scan History
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Lightbulb" size={20} className="mr-2 text-primary" />
                Scanning Tips
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Ensure good lighting for optimal scanning
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Hold device steady and align QR code in frame
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Clean camera lens for better clarity
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Use flash in low light conditions
                  </span>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Shield" size={20} className="mr-2 text-primary" />
                Security & Privacy
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={14} className="text-accent" />
                  <span>All scans are encrypted and secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Eye" size={14} className="text-accent" />
                  <span>Camera access is used only for scanning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={14} className="text-accent" />
                  <span>Data verified on blockchain network</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
                Need Help?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Having trouble scanning? Our support team is here to help.
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  className="w-full justify-start"
                >
                  Call Support
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="w-full justify-start"
                >
                  Live Chat
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scan History */}
        {showHistory && (
          <div className="mt-8">
            <ScanHistory
              onScanSelect={handleHistorySelect}
              onClearHistory={() => console.log('Clear history')}
              isVisible={showHistory}
            />
          </div>
        )}
      </main>

      {/* Manual Code Entry Modal */}
      {showManualEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <ManualCodeEntry
              onCodeSubmit={handleManualCodeSubmit}
              onCancel={() => setShowManualEntry(false)}
              isVisible={showManualEntry}
            />
          </div>
        </div>
      )}

      {/* Scanning Progress */}
      <ScanningProgress
        isVisible={showProgress}
        onComplete={handleProgressComplete}
        onCancel={handleProgressCancel}
        scanData={scanData}
      />
    </div>
  );
};

export default QRCodeScanner;