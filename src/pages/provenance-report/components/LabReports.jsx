import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LabReports = ({ 
  labData = {},
  onDownloadReport = () => {}
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const defaultLabData = {
    labName: 'Certified Analytical Laboratory',
    certificationNumber: 'CAL-2024-TUR-0892',
    testDate: '11/01/2024',
    reportDate: '11/05/2024',
    analyst: 'Dr. Priya Sharma',
    accreditation: 'ISO/IEC 17025:2017',
    overallStatus: 'PASS',
    tests: [
      {
        category: 'Physical Parameters',
        tests: [
          { name: 'Moisture Content', result: '8.2%', standard: '< 10%', status: 'pass', unit: '%' },
          { name: 'Ash Content', result: '6.8%', standard: '< 8%', status: 'pass', unit: '%' },
          { name: 'Particle Size', result: '80 mesh', standard: '80 mesh', status: 'pass', unit: 'mesh' }
        ]
      },
      {
        category: 'Chemical Analysis',
        tests: [
          { name: 'Curcumin Content', result: '3.8%', standard: '> 3%', status: 'pass', unit: '%' },
          { name: 'Essential Oil', result: '5.2%', standard: '> 4%', status: 'pass', unit: '%' },
          { name: 'pH Value', result: '6.4', standard: '6.0-7.0', status: 'pass', unit: 'pH' }
        ]
      },
      {
        category: 'Contaminant Analysis',
        tests: [
          { name: 'Pesticide Residue', result: 'Not Detected', standard: 'Below LOD', status: 'pass', unit: 'ppm' },
          { name: 'Heavy Metals (Lead)', result: '< 0.1', standard: '< 2.0', status: 'pass', unit: 'ppm' },
          { name: 'Heavy Metals (Cadmium)', result: '< 0.05', standard: '< 0.3', status: 'pass', unit: 'ppm' },
          { name: 'Aflatoxins', result: 'Not Detected', standard: 'Below LOD', status: 'pass', unit: 'ppb' }
        ]
      },
      {
        category: 'Microbiological Tests',
        tests: [
          { name: 'Total Plate Count', result: '2.1 × 10³', standard: '< 10⁵', status: 'pass', unit: 'CFU/g' },
          { name: 'Yeast & Mold', result: '< 10²', standard: '< 10³', status: 'pass', unit: 'CFU/g' },
          { name: 'E. coli', result: 'Absent', standard: 'Absent', status: 'pass', unit: '/g' },
          { name: 'Salmonella', result: 'Absent', standard: 'Absent', status: 'pass', unit: '/25g' }
        ]
      }
    ],
    certificates: [
      { name: 'Complete Lab Report', size: '2.4 MB', type: 'PDF', downloadUrl: '#' },
      { name: 'Certificate of Analysis', size: '1.1 MB', type: 'PDF', downloadUrl: '#' },
      { name: 'Pesticide Analysis Report', size: '890 KB', type: 'PDF', downloadUrl: '#' }
    ]
  };

  const data = { ...defaultLabData, ...labData };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'detailed', label: 'Detailed Results', icon: 'BarChart3' },
    { id: 'certificates', label: 'Certificates', icon: 'Award' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass':
        return 'text-accent bg-accent/10';
      case 'fail':
        return 'text-error bg-error/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return 'CheckCircle';
      case 'fail':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Laboratory Analysis
        </h2>
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${getStatusColor(data?.overallStatus?.toLowerCase())}`}>
          <Icon name={getStatusIcon(data?.overallStatus?.toLowerCase())} size={16} />
          <span className="font-medium text-sm">Overall: {data?.overallStatus}</span>
        </div>
      </div>
      {/* Lab Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Testing Laboratory</p>
          <p className="font-medium text-foreground text-sm">{data?.labName}</p>
          <p className="text-xs text-muted-foreground">{data?.accreditation}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Certificate Number</p>
          <p className="font-data font-medium text-foreground text-sm">{data?.certificationNumber}</p>
          <p className="text-xs text-muted-foreground">Report Date: {data?.reportDate}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Analyst</p>
          <p className="font-medium text-foreground text-sm">{data?.analyst}</p>
          <p className="text-xs text-muted-foreground">Test Date: {data?.testDate}</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            size="sm"
            iconName={tab?.icon}
            iconPosition="left"
            iconSize={16}
            onClick={() => setActiveTab(tab?.id)}
            className="flex-1 transition-smooth"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.tests?.map((category) => (
              category?.tests?.slice(0, 1)?.map((test, index) => (
                <div key={`${category?.category}-${index}`} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{test?.name}</h4>
                    <Icon 
                      name={getStatusIcon(test?.status)} 
                      size={16} 
                      className={test?.status === 'pass' ? 'text-accent' : 'text-error'} 
                    />
                  </div>
                  <p className="text-lg font-semibold text-foreground">{test?.result}</p>
                  <p className="text-xs text-muted-foreground">Standard: {test?.standard}</p>
                </div>
              ))
            ))}
          </div>

          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-1">Quality Assurance Summary</h3>
                <p className="text-sm text-muted-foreground">
                  All tested parameters meet or exceed the required standards for organic turmeric powder. 
                  The product shows excellent purity levels with no detectable contaminants and optimal 
                  curcumin content for therapeutic efficacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'detailed' && (
        <div className="space-y-6">
          {data?.tests?.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-3">
              <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                <Icon name="FlaskConical" size={18} className="text-primary" />
                <span>{category?.category}</span>
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Parameter</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Result</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Standard</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.tests?.map((test, testIndex) => (
                      <tr key={testIndex} className="border-b border-border/50">
                        <td className="py-3 px-3 text-sm text-foreground">{test?.name}</td>
                        <td className="py-3 px-3 text-sm font-medium text-foreground">
                          {test?.result} {test?.unit && <span className="text-muted-foreground">{test?.unit}</span>}
                        </td>
                        <td className="py-3 px-3 text-sm text-muted-foreground">{test?.standard}</td>
                        <td className="py-3 px-3">
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full ${getStatusColor(test?.status)}`}>
                            <Icon name={getStatusIcon(test?.status)} size={12} />
                            <span className="text-xs font-medium capitalize">{test?.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Download official laboratory certificates and detailed analysis reports.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.certificates?.map((cert, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm mb-1">{cert?.name}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-3">
                      <span>{cert?.type}</span>
                      <span>•</span>
                      <span>{cert?.size}</span>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => onDownloadReport(cert)}
                      className="w-full transition-smooth"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground text-sm mb-1">Certificate Verification</h4>
                <p className="text-xs text-muted-foreground">
                  All certificates are digitally signed and can be verified through the issuing laboratory's 
                  official website. QR codes on certificates provide instant verification access.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabReports;