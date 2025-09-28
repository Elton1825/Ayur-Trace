import React from 'react';
import Icon from '../../../components/AppIcon';


const ScanModeToggle = ({ 
  currentMode = 'camera',
  onModeChange = () => {},
  isMobile = false 
}) => {
  const modes = [
    {
      key: 'camera',
      label: 'Camera',
      icon: 'Camera',
      description: 'Scan with device camera',
      available: true
    },
    {
      key: 'upload',
      label: 'Upload',
      icon: 'Upload',
      description: 'Upload QR code image',
      available: true
    }
  ];

  const availableModes = modes?.filter(mode => mode?.available);

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Choose Scan Method
          </h3>
          <p className="text-sm text-muted-foreground">
            Select how you'd like to scan the QR code
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableModes?.map((mode) => (
            <button
              key={mode?.key}
              onClick={() => onModeChange(mode?.key)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                currentMode === mode?.key
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentMode === mode?.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={mode?.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`font-medium ${
                      currentMode === mode?.key ? 'text-primary' : 'text-foreground'
                    }`}>
                      {mode?.label}
                    </h4>
                    {currentMode === mode?.key && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mode?.description}
                  </p>
                </div>
              </div>

              {/* Recommended Badge */}
              {mode?.key === 'camera' && isMobile && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Recommended
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              {currentMode === 'camera' ? (
                <span>
                  Ensure good lighting and hold steady for best results. 
                  {isMobile && ' Tap the flash button if needed.'}
                </span>
              ) : (
                <span>
                  Upload clear images in JPG, PNG, or GIF format. Maximum file size is 10MB.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="border-t border-border pt-3">
          <h5 className="text-sm font-medium text-foreground mb-2">Quick Tips:</h5>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-accent" />
              <span>Position QR code within the scanning frame</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-accent" />
              <span>Ensure the code is not damaged or obscured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-accent" />
              <span>Clean your camera lens for better clarity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanModeToggle;