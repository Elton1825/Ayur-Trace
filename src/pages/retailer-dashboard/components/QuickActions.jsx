import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onBulkExport = () => {} }) => {
  const navigate = useNavigate();

  const handleQRScan = () => {
    navigate('/qr-code-scanner');
  };

  const handleViewReports = () => {
    navigate('/provenance-report');
  };

  const quickActionItems = [
    {
      id: 'qr-scan',
      title: 'QR Code Scanner',
      description: 'Scan product QR codes for instant verification',
      icon: 'QrCode',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      action: handleQRScan,
      primary: true
    },
    {
      id: 'bulk-export',
      title: 'Bulk Export',
      description: 'Export batch data and compliance reports',
      icon: 'Download',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      action: onBulkExport,
      primary: false
    },
    {
      id: 'view-reports',
      title: 'View Reports',
      description: 'Access detailed provenance and compliance reports',
      icon: 'FileText',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      action: handleViewReports,
      primary: false
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">
          Frequently used tools and operations
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActionItems?.map((item) => (
          <div
            key={item?.id}
            className={`relative overflow-hidden rounded-lg border border-border transition-smooth hover:shadow-lg scale-hover cursor-pointer ${
              item?.primary ? 'ring-2 ring-primary/20' : ''
            }`}
            onClick={item?.action}
          >
            <div className={`${item?.color} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center`}>
                  <Icon name={item?.icon} size={20} className={item?.textColor} />
                </div>
                {item?.primary && (
                  <div className="bg-white/20 px-2 py-1 rounded-full">
                    <span className={`text-xs font-medium ${item?.textColor}`}>
                      Primary
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className={`text-lg font-semibold ${item?.textColor} mb-2`}>
                {item?.title}
              </h3>
              
              <p className={`text-sm ${item?.textColor} opacity-90 mb-4`}>
                {item?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                  className={`${item?.textColor} hover:bg-white/10 border-white/20`}
                  onClick={(e) => {
                    e?.stopPropagation();
                    item?.action();
                  }}
                >
                  {item?.primary ? 'Start Scanning' : 'Access'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Quick Links */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
              onClick={() => navigate('/settings')}
            >
              Settings
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
              iconSize={16}
              onClick={() => navigate('/help')}
            >
              Help & Support
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;