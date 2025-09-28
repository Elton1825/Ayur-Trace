import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceReports = ({ reports = [] }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleDownloadReport = (report) => {
    // Mock PDF download functionality
    const link = document.createElement('a');
    link.href = report?.downloadUrl || '#';
    link.download = `${report?.title?.replace(/\s+/g, '_')}_${report?.date}.pdf`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const getReportStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'non-compliant':
        return { icon: 'XCircle', color: 'text-error' };
      default:
        return { icon: 'Clock', color: 'text-muted-foreground' };
    }
  };

  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'quality':
        return 'Award';
      case 'safety':
        return 'Shield';
      case 'regulatory':
        return 'FileText';
      case 'audit':
        return 'Search';
      default:
        return 'FileText';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Compliance Reports</h2>
            <p className="text-sm text-muted-foreground">
              {reports?.length} reports available
            </p>
          </div>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            onClick={() => {
              // Mock bulk download
              console.log('Downloading all reports...');
            }}
          >
            Download All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {reports?.map((report) => {
          const statusConfig = getReportStatusIcon(report?.status);
          
          return (
            <div key={report?.id} className="p-6 hover:bg-muted/30 transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getReportTypeIcon(report?.type)} 
                      size={20} 
                      className="text-primary" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-medium text-foreground">
                        {report?.title}
                      </h3>
                      <div className={`flex items-center space-x-1 ${statusConfig?.color}`}>
                        <Icon name={statusConfig?.icon} size={16} />
                        <span className="text-sm font-medium capitalize">
                          {report?.status?.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {report?.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>Generated: {new Date(report.date)?.toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>By: {report?.generatedBy}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Icon name="Package" size={12} />
                        <span>{report?.productsCount} products</span>
                      </div>
                      
                      {report?.expiryDate && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>Valid until: {new Date(report.expiryDate)?.toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {report?.keyFindings && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <h4 className="text-sm font-medium text-foreground mb-2">Key Findings:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {report?.keyFindings?.map((finding, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="ChevronRight" size={12} className="mt-0.5 flex-shrink-0" />
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconSize={16}
                    onClick={() => setSelectedReport(report)}
                  >
                    View
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconSize={16}
                    onClick={() => handleDownloadReport(report)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {reports?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No reports available</h3>
          <p className="text-muted-foreground">
            Compliance reports will appear here once generated
          </p>
        </div>
      )}
      {/* Report Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden modal-shadow">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedReport?.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconSize={16}
                onClick={() => setSelectedReport(null)}
              />
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div className={`flex items-center space-x-1 mt-1 ${getReportStatusIcon(selectedReport?.status)?.color}`}>
                      <Icon name={getReportStatusIcon(selectedReport?.status)?.icon} size={14} />
                      <span className="font-medium capitalize">
                        {selectedReport?.status?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Generated:</span>
                    <p className="text-foreground mt-1">
                      {new Date(selectedReport.date)?.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Products:</span>
                    <p className="text-foreground mt-1">{selectedReport?.productsCount}</p>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Generated By:</span>
                    <p className="text-foreground mt-1">{selectedReport?.generatedBy}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Description:</span>
                  <p className="text-foreground mt-1">{selectedReport?.description}</p>
                </div>
                
                {selectedReport?.keyFindings && (
                  <div>
                    <span className="text-muted-foreground">Key Findings:</span>
                    <ul className="text-foreground mt-2 space-y-2">
                      {selectedReport?.keyFindings?.map((finding, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="ChevronRight" size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                onClick={() => {
                  handleDownloadReport(selectedReport);
                  setSelectedReport(null);
                }}
              >
                Download Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceReports;