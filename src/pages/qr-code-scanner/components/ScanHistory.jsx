import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScanHistory = ({ 
  onScanSelect = () => {},
  onClearHistory = () => {},
  isVisible = false 
}) => {
  const [selectedScan, setSelectedScan] = useState(null);

  // Mock scan history data
  const scanHistory = [
    {
      id: 1,
      productId: "AYR-TRM001",
      productName: "Organic Turmeric Powder",
      batchId: "BTH-2024-156",
      scanDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "verified",
      thumbnail: "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 2,
      productId: "AYR-ASH002",
      productName: "Ashwagandha Root Extract",
      batchId: "BTH-2024-143",
      scanDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: "verified",
      thumbnail: "https://images.pexels.com/photos/6627946/pexels-photo-6627946.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 3,
      productId: "AYR-NEM003",
      productName: "Neem Leaf Powder",
      batchId: "BTH-2024-128",
      scanDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: "warning",
      thumbnail: "https://images.pexels.com/photos/8142977/pexels-photo-8142977.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 4,
      productId: "AYR-BRM004",
      productName: "Brahmi Herb Extract",
      batchId: "BTH-2024-112",
      scanDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: "verified",
      thumbnail: "https://images.pexels.com/photos/7195706/pexels-photo-7195706.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 5,
      productId: "AYR-GIL005",
      productName: "Giloy Stem Powder",
      batchId: "BTH-2024-098",
      scanDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      status: "verified",
      thumbnail: "https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      verified: {
        color: 'text-success',
        bgColor: 'bg-success/10',
        icon: 'CheckCircle',
        label: 'Verified'
      },
      warning: {
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        icon: 'AlertTriangle',
        label: 'Warning'
      },
      error: {
        color: 'text-error',
        bgColor: 'bg-error/10',
        icon: 'XCircle',
        label: 'Failed'
      }
    };
    return configs?.[status] || configs?.verified;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const handleScanClick = (scan) => {
    setSelectedScan(scan?.id);
    onScanSelect(scan);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Scans</h3>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {scanHistory?.length}
          </span>
        </div>
        
        {scanHistory?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
            className="text-muted-foreground hover:text-error"
          >
            Clear
          </Button>
        )}
      </div>
      {/* History List */}
      <div className="max-h-96 overflow-y-auto">
        {scanHistory?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="QrCode" size={48} className="text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Scans Yet</h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your recently scanned products will appear here for quick access
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {scanHistory?.map((scan) => {
              const statusConfig = getStatusConfig(scan?.status);
              
              return (
                <button
                  key={scan?.id}
                  onClick={() => handleScanClick(scan)}
                  className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                    selectedScan === scan?.id ? 'bg-primary/5 border-r-2 border-r-primary' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Product Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={scan?.thumbnail}
                          alt={scan?.productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">
                          {scan?.productName}
                        </h4>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${statusConfig?.bgColor} ${statusConfig?.color}`}>
                          <Icon name={statusConfig?.icon} size={12} />
                          <span>{statusConfig?.label}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span className="font-data">{scan?.productId}</span>
                        <span>•</span>
                        <span className="font-data">{scan?.batchId}</span>
                      </div>
                    </div>

                    {/* Time & Action */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-xs text-muted-foreground mb-1">
                        {formatTimeAgo(scan?.scanDate)}
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {/* Footer Actions */}
      {scanHistory?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {scanHistory?.length} recent scans
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={14}
              className="text-primary hover:text-primary/80"
            >
              View All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanHistory;