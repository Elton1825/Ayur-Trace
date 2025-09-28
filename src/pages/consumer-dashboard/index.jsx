import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('ayurtrace_user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }

    // Mock recent scans data
    setRecentScans([
      {
        id: 'scan_001',
        productName: 'Ashwagandha Root Extract',
        batchId: 'ASH2024001',
        scanDate: '2024-01-15T10:30:00Z',
        status: 'verified',
        manufacturer: 'Himalaya Wellness'
      },
      {
        id: 'scan_002',
        productName: 'Turmeric Capsules',
        batchId: 'TUR2024007',
        scanDate: '2024-01-12T15:45:00Z',
        status: 'verified',
        manufacturer: 'Organic India'
      },
      {
        id: 'scan_003',
        productName: 'Triphala Powder',
        batchId: 'TRI2024003',
        scanDate: '2024-01-10T09:20:00Z',
        status: 'pending',
        manufacturer: 'Patanjali Ayurved'
      }
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ayurtrace_user');
    navigate('/login');
  };

  const handleScanProduct = () => {
    navigate('/qr-code-scanner');
  };

  const handleViewReport = (scanId) => {
    navigate(`/provenance-report?scanId=${scanId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'AlertCircle';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">
                  AyurTrace
                </h1>
                <p className="text-xs text-muted-foreground">
                  Consumer Portal
                </p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="left"
                iconSize={16}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')?.[0]}!
          </h2>
          <p className="text-lg text-muted-foreground">
            Scan and verify authentic Ayurvedic products with blockchain transparency
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Scan New Product */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="QrCode" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Scan Product</h3>
                <p className="text-sm text-muted-foreground">
                  Verify authenticity with QR code scanning
                </p>
              </div>
            </div>
            <Button
              onClick={handleScanProduct}
              variant="default"
              size="lg"
              fullWidth
              iconName="Camera"
              iconPosition="left"
              iconSize={18}
            >
              Start Scanning
            </Button>
          </div>

          {/* Account Overview */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Account Status</h3>
                <p className="text-sm text-muted-foreground">
                  Your verification status and activity
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Account Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Scans</span>
                <span className="text-sm font-medium text-foreground">{recentScans?.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Login</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(user?.lastLogin)?.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-card rounded-2xl border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">Recent Scans</h3>
                <p className="text-sm text-muted-foreground">
                  Your recent product verification history
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="History"
                iconPosition="left"
                iconSize={16}
              >
                View All
              </Button>
            </div>
          </div>

          <div className="p-6">
            {recentScans?.length > 0 ? (
              <div className="space-y-4">
                {recentScans?.map((scan, index) => (
                  <div
                    key={scan?.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:shadow-sm transition-smooth"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Package" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{scan?.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Batch: {scan?.batchId} • {scan?.manufacturer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(scan?.scanDate)?.toLocaleDateString()} at{' '}
                          {new Date(scan?.scanDate)?.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          scan?.status
                        )}`}
                      >
                        <Icon
                          name={getStatusIcon(scan?.status)}
                          size={12}
                          className="mr-1"
                        />
                        {scan?.status?.charAt(0)?.toUpperCase() + scan?.status?.slice(1)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewReport(scan?.id)}
                        iconName="ExternalLink"
                        iconPosition="right"
                        iconSize={14}
                      >
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="QrCode" size={32} className="text-muted-foreground" />
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">No Scans Yet</h4>
                <p className="text-muted-foreground mb-4">
                  Start by scanning your first Ayurvedic product
                </p>
                <Button
                  onClick={handleScanProduct}
                  variant="outline"
                  iconName="QrCode"
                  iconPosition="left"
                  iconSize={16}
                >
                  Scan Your First Product
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;