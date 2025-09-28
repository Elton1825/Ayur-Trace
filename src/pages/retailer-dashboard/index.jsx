import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import AuthenticationContext from '../../components/ui/AuthenticationContext';
import RecallNotificationBanner from '../../components/ui/RecallNotificationBanner';
import MetricsCard from './components/MetricsCard';
import BatchHistoryTable from './components/BatchHistoryTable';
import ComplianceReports from './components/ComplianceReports';
import QuickActions from './components/QuickActions';

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recallData, setRecallData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: "retailer_001",
      name: "Sarah Johnson",
      email: "sarah.johnson@greenleafpharmacy.com",
      role: "retailer",
      storeId: "GL_001",
      storeName: "Green Leaf Pharmacy",
      location: "Downtown Seattle, WA",
      joinDate: "2023-03-15",
      lastLogin: new Date()?.toISOString()
    };
    
    setUser(mockUser);
    
    // Mock recall notification
    const mockRecall = {
      id: "recall_2025_001",
      severity: "medium",
      message: "Quality control alert for Ashwagandha Root Powder batches manufactured between Jan 1-15, 2025",
      affectedProducts: 3,
      details: {
        reason: "Moisture content exceeding acceptable limits detected in quality testing",
        batchIds: ["ASH_2025_001", "ASH_2025_002", "ASH_2025_003"],
        dateIssued: "2025-01-05",
        expiryDate: "2025-02-05"
      },
      contactInfo: {
        phone: "+1-800-555-0123",
        email: "quality@ayurtrace.com"
      }
    };
    
    setRecallData(mockRecall);
    setIsLoading(false);
  }, []);

  // Mock metrics data
  const metricsData = [
    {
      title: "Products Scanned",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive",
      icon: "QrCode",
      description: "Total scans this month"
    },
    {
      title: "Compliance Rate",
      value: "98.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: "Shield",
      description: "Products meeting standards"
    },
    {
      title: "Failed Verifications",
      value: "23",
      change: "-8.3%",
      changeType: "positive",
      icon: "AlertTriangle",
      description: "Reduced from last month"
    },
    {
      title: "Active Recalls",
      value: "3",
      change: "+1",
      changeType: "warning",
      icon: "AlertCircle",
      description: "Requires immediate attention"
    }
  ];

  // Mock batch history data
  const batchHistoryData = [
    {
      id: "batch_001",
      productName: "Organic Turmeric Powder",
      batchId: "TUR_2025_001",
      manufacturer: "Himalayan Herbs Co.",
      status: "verified",
      category: "powders",
      complianceBadges: [
        { name: "Organic", icon: "Leaf" },
        { name: "Fair Trade", icon: "Heart" },
        { name: "Lab Tested", icon: "CheckCircle" }
      ],
      lastScan: "2025-01-05T14:30:00Z"
    },
    {
      id: "batch_002",
      productName: "Ashwagandha Root Extract",
      batchId: "ASH_2025_002",
      manufacturer: "Ayur Naturals Ltd.",
      status: "pending",
      category: "herbs",
      complianceBadges: [
        { name: "Lab Tested", icon: "CheckCircle" },
        { name: "Biodiversity Safe", icon: "Globe" }
      ],
      lastScan: "2025-01-05T12:15:00Z"
    },
    {
      id: "batch_003",
      productName: "Brahmi Oil",
      batchId: "BRA_2025_001",
      manufacturer: "Kerala Ayurveda",
      status: "verified",
      category: "oils",
      complianceBadges: [
        { name: "Organic", icon: "Leaf" },
        { name: "Traditional Method", icon: "Award" }
      ],
      lastScan: "2025-01-05T10:45:00Z"
    },
    {
      id: "batch_004",
      productName: "Triphala Tablets",
      batchId: "TRI_2025_001",
      manufacturer: "Wellness Pharma",
      status: "failed",
      category: "tablets",
      complianceBadges: [
        { name: "Lab Tested", icon: "CheckCircle" }
      ],
      lastScan: "2025-01-04T16:20:00Z"
    },
    {
      id: "batch_005",
      productName: "Neem Leaf Powder",
      batchId: "NEE_2025_001",
      manufacturer: "Green Valley Herbs",
      status: "expired",
      category: "powders",
      complianceBadges: [
        { name: "Organic", icon: "Leaf" }
      ],
      lastScan: "2025-01-03T09:30:00Z"
    }
  ];

  // Mock compliance reports data
  const complianceReportsData = [
    {
      id: "report_001",
      title: "Monthly Quality Assurance Report",
      description: "Comprehensive analysis of product quality metrics and compliance status for December 2024",
      type: "quality",
      status: "compliant",
      date: "2025-01-01T00:00:00Z",
      generatedBy: "Quality Team",
      productsCount: 156,
      expiryDate: "2025-04-01T00:00:00Z",
      downloadUrl: "#",
      keyFindings: [
        "98.2% of products met quality standards",
        "Moisture content within acceptable limits for 95% of herb powders",
        "Zero pesticide residue detected in organic certified products",
        "3 batches flagged for review due to packaging inconsistencies"
      ]
    },
    {
      id: "report_002",
      title: "Regulatory Compliance Audit",
      description: "Annual audit report covering FDA and organic certification compliance",
      type: "regulatory",
      status: "warning",
      date: "2024-12-15T00:00:00Z",
      generatedBy: "Compliance Officer",
      productsCount: 89,
      expiryDate: "2025-12-15T00:00:00Z",
      downloadUrl: "#",
      keyFindings: [
        "Minor labeling discrepancies found in 5 product lines",
        "Organic certification renewal required for 3 suppliers",
        "Documentation updates needed for traceability records",
        "Overall compliance rate: 94.3%"
      ]
    },
    {
      id: "report_003",
      title: "Safety Assessment Report",
      description: "Product safety evaluation including contamination screening and allergen testing",
      type: "safety",
      status: "compliant",
      date: "2024-12-01T00:00:00Z",
      generatedBy: "Safety Team",
      productsCount: 203,
      downloadUrl: "#",
      keyFindings: [
        "All products passed heavy metal screening",
        "No microbial contamination detected",
        "Allergen labeling accuracy: 100%",
        "Storage condition compliance: 97.8%"
      ]
    }
  ];

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleBatchClick = (batch) => {
    // Navigate to provenance report with batch data
    navigate('/provenance-report', { 
      state: { 
        batchData: batch,
        fromDashboard: true 
      } 
    });
  };

  const handleBulkExport = () => {
    // Mock bulk export functionality
    console.log('Initiating bulk export...');
    // In real implementation, this would trigger a download
    alert('Bulk export initiated. You will receive an email when the export is ready for download.');
  };

  const handleRecallDismiss = () => {
    setRecallData(null);
  };

  const handleRecallViewDetails = (recall) => {
    // Navigate to detailed recall information
    navigate('/provenance-report', { 
      state: { 
        recallData: recall,
        fromRecall: true 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <AuthenticationContext user={user} onLogout={handleLogout} />
      <WorkflowBreadcrumb currentStep="dashboard" />
      {recallData && (
        <RecallNotificationBanner
          recallData={recallData}
          onDismiss={handleRecallDismiss}
          onViewDetails={handleRecallViewDetails}
        />
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-muted-foreground">
            {user?.storeName} • {user?.location}
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData?.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              description={metric?.description}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions onBulkExport={handleBulkExport} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Batch History Table - Takes 2 columns */}
          <div className="xl:col-span-2">
            <BatchHistoryTable
              batches={batchHistoryData}
              onBatchClick={handleBatchClick}
            />
          </div>

          {/* Compliance Reports - Takes 1 column */}
          <div className="xl:col-span-1">
            <ComplianceReports reports={complianceReportsData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RetailerDashboard;