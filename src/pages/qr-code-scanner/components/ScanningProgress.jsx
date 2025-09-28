import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScanningProgress = ({ 
  isVisible = false,
  onComplete = () => {},
  onCancel = () => {},
  scanData = null 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 'decode',
      label: 'Decoding QR Code',
      description: 'Reading product information',
      icon: 'QrCode',
      duration: 1000
    },
    {
      id: 'blockchain',
      label: 'Blockchain Verification',
      description: 'Verifying authenticity on blockchain',
      icon: 'Shield',
      duration: 2000
    },
    {
      id: 'provenance',
      label: 'Loading Provenance Data',
      description: 'Fetching supply chain information',
      icon: 'MapPin',
      duration: 1500
    },
    {
      id: 'complete',
      label: 'Verification Complete',
      description: 'Product successfully verified',
      icon: 'CheckCircle',
      duration: 500
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepTimer;
    let progressTimer;

    const runStep = (stepIndex) => {
      if (stepIndex >= steps?.length) {
        setTimeout(() => {
          onComplete(scanData);
        }, 500);
        return;
      }

      setCurrentStep(stepIndex);
      setProgress(0);

      const step = steps?.[stepIndex];
      const progressIncrement = 100 / (step?.duration / 50);

      progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + progressIncrement;
          if (newProgress >= 100) {
            clearInterval(progressTimer);
            stepTimer = setTimeout(() => {
              runStep(stepIndex + 1);
            }, 200);
            return 100;
          }
          return newProgress;
        });
      }, 50);
    };

    runStep(0);

    return () => {
      if (stepTimer) clearTimeout(stepTimer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [isVisible, scanData, onComplete]);

  if (!isVisible) {
    return null;
  }

  const currentStepData = steps?.[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border p-8 max-w-md w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <Icon 
              name={currentStepData?.icon || 'QrCode'} 
              size={40} 
              className="text-primary" 
            />
            {currentStep < steps?.length - 1 && (
              <div className="absolute inset-0 rounded-full border-4 border-primary/20">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                  style={{ animationDuration: '1s' }}
                ></div>
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {currentStepData?.label || 'Processing...'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentStepData?.description || 'Please wait while we process your request'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4 mb-8">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep 
                  ? 'bg-accent text-accent-foreground' 
                  : index === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {index < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : index === currentStep ? (
                  <div className="w-3 h-3 bg-current rounded-full animate-pulse"></div>
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.label}
                </div>
                {index === currentStep && (
                  <div className="mt-1">
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Product Info (if available) */}
        {scanData && (
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Package" size={16} className="text-primary" />
              <span className="font-medium text-foreground">Product ID:</span>
              <span className="font-data text-muted-foreground">{scanData?.productId}</span>
            </div>
            {scanData?.batchId && (
              <div className="flex items-center space-x-2 text-sm mt-1">
                <Icon name="Hash" size={16} className="text-primary" />
                <span className="font-medium text-foreground">Batch ID:</span>
                <span className="font-data text-muted-foreground">{scanData?.batchId}</span>
              </div>
            )}
          </div>
        )}

        {/* Cancel Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Cancel Verification
          </Button>
        </div>

        {/* Loading Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanningProgress;