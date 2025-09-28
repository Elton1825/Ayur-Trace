import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductHeader = ({ 
  productData = {},
  onDownloadReport = () => {},
  onShareReport = () => {},
  onBackToScan = () => {}
}) => {
  const trustBadges = [
    {
      id: 'blockchain',
      label: 'Blockchain Verified',
      icon: 'Shield',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'organic',
      label: 'Organic Certified',
      icon: 'Leaf',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'sustainability',
      label: 'Sustainability Verified',
      icon: 'Recycle',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 card-shadow">
      {/* Product Title Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
        <div className="flex-1 mb-4 lg:mb-0">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                {productData?.name || 'Organic Turmeric Powder'}
              </h1>
              <p className="text-muted-foreground">
                Premium Ayurvedic Herb Product
              </p>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Icon name="Hash" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Batch ID</p>
                <p className="font-data font-medium text-foreground">
                  {productData?.batchId || 'TUR-2024-0892'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Packaging Date</p>
                <p className="font-medium text-foreground">
                  {productData?.packagingDate || '12/15/2024'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-medium text-accent">Verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            onClick={onDownloadReport}
            className="transition-smooth"
          >
            Download Report
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            iconPosition="left"
            iconSize={16}
            onClick={onShareReport}
            className="transition-smooth"
          >
            Share
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="QrCode"
            iconPosition="left"
            iconSize={16}
            onClick={onBackToScan}
            className="transition-smooth"
          >
            Scan Another
          </Button>
        </div>
      </div>
      {/* Trust Badges */}
      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Certifications & Verification</h3>
        <div className="flex flex-wrap gap-3">
          {trustBadges?.map((badge) => (
            <div
              key={badge?.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full ${badge?.bgColor} transition-smooth hover:scale-105`}
            >
              <Icon name={badge?.icon} size={16} className={badge?.color} />
              <span className={`text-sm font-medium ${badge?.color}`}>
                {badge?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;