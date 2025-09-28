import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const RecallNotificationBanner = ({ 
  recallData = null,
  onDismiss = () => {},
  onViewDetails = () => {},
  isDismissible = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (recallData) {
      setIsVisible(true);
    }
  }, [recallData]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  const handleViewDetails = () => {
    onViewDetails(recallData);
  };

  const getSeverityConfig = (severity = 'medium') => {
    const configs = {
      high: {
        bgColor: 'bg-error',
        textColor: 'text-error-foreground',
        icon: 'AlertTriangle',
        label: 'Critical Recall'
      },
      medium: {
        bgColor: 'bg-warning',
        textColor: 'text-warning-foreground',
        icon: 'AlertCircle',
        label: 'Product Recall'
      },
      low: {
        bgColor: 'bg-accent',
        textColor: 'text-accent-foreground',
        icon: 'Info',
        label: 'Safety Notice'
      }
    };
    
    return configs?.[severity] || configs?.medium;
  };

  if (!recallData || !isVisible) {
    return null;
  }

  const severityConfig = getSeverityConfig(recallData?.severity);

  return (
    <div className={`slide-in ${severityConfig?.bgColor} border-l-4 border-l-current`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <Icon 
                  name={severityConfig?.icon} 
                  size={20} 
                  className={severityConfig?.textColor}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`text-sm font-semibold ${severityConfig?.textColor}`}>
                    {severityConfig?.label}
                  </h3>
                  {recallData?.affectedProducts && (
                    <span className={`text-xs px-2 py-1 rounded-full bg-black/10 ${severityConfig?.textColor}`}>
                      {recallData?.affectedProducts} products affected
                    </span>
                  )}
                </div>

                <p className={`text-sm ${severityConfig?.textColor} mb-2`}>
                  {recallData?.message || 'A product recall has been issued. Please check your inventory for affected items.'}
                </p>

                {/* Expandable Details */}
                {recallData?.details && (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                      iconPosition="right"
                      iconSize={14}
                      onClick={() => setIsExpanded(!isExpanded)}
                      className={`${severityConfig?.textColor} hover:bg-black/10 p-1`}
                    >
                      {isExpanded ? 'Show Less' : 'Show Details'}
                    </Button>

                    {isExpanded && (
                      <div className={`text-xs ${severityConfig?.textColor} bg-black/10 rounded-lg p-3 space-y-2`}>
                        {recallData?.details?.reason && (
                          <div>
                            <span className="font-medium">Reason: </span>
                            {recallData?.details?.reason}
                          </div>
                        )}
                        {recallData?.details?.batchIds && (
                          <div>
                            <span className="font-medium">Affected Batches: </span>
                            <span className="font-data">{recallData?.details?.batchIds?.join(', ')}</span>
                          </div>
                        )}
                        {recallData?.details?.dateIssued && (
                          <div>
                            <span className="font-medium">Issued: </span>
                            {new Date(recallData.details.dateIssued)?.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    iconSize={14}
                    onClick={handleViewDetails}
                    className={`${severityConfig?.textColor} hover:bg-black/10 border border-current`}
                  >
                    View Full Report
                  </Button>

                  {recallData?.contactInfo && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Phone"
                      iconPosition="left"
                      iconSize={14}
                      onClick={() => window.open(`tel:${recallData?.contactInfo?.phone}`, '_self')}
                      className={`${severityConfig?.textColor} hover:bg-black/10`}
                    >
                      Contact Support
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Dismiss Button */}
            {isDismissible && (
              <div className="flex-shrink-0 ml-4">
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="X"
                  iconSize={16}
                  onClick={handleDismiss}
                  className={`${severityConfig?.textColor} hover:bg-black/10`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecallNotificationBanner;