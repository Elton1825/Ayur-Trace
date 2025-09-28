import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const WorkflowBreadcrumb = ({ 
  currentStep = 'dashboard',
  productData = null,
  onBack = null 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const workflowSteps = [
    { 
      key: 'dashboard', 
      label: 'Dashboard', 
      path: '/retailer-dashboard',
      icon: 'LayoutDashboard'
    },
    { 
      key: 'scan', 
      label: 'Scan Product', 
      path: '/qr-code-scanner',
      icon: 'QrCode'
    },
    { 
      key: 'report', 
      label: 'Provenance Report', 
      path: '/provenance-report',
      icon: 'FileText'
    }
  ];

  const getCurrentStepIndex = () => {
    return workflowSteps?.findIndex(step => step?.key === currentStep);
  };

  const handleStepClick = (step, index) => {
    const currentIndex = getCurrentStepIndex();
    
    // Only allow navigation to previous steps or current step
    if (index <= currentIndex) {
      if (onBack && index < currentIndex) {
        onBack();
      } else {
        navigate(step?.path);
      }
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      const currentIndex = getCurrentStepIndex();
      if (currentIndex > 0) {
        const previousStep = workflowSteps?.[currentIndex - 1];
        navigate(previousStep?.path);
      }
    }
  };

  // Don't show breadcrumb on login or dashboard
  if (location?.pathname === '/login' || location?.pathname === '/retailer-dashboard') {
    return null;
  }

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="bg-background border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowLeft"
            iconPosition="left"
            iconSize={16}
            onClick={handleBackClick}
            className="transition-smooth"
          >
            Back
          </Button>

          {/* Desktop Breadcrumb */}
          <nav className="hidden md:flex items-center space-x-2" aria-label="Workflow progress">
            {workflowSteps?.map((step, index) => (
              <React.Fragment key={step?.key}>
                <button
                  onClick={() => handleStepClick(step, index)}
                  disabled={index > currentStepIndex}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    index === currentStepIndex
                      ? 'bg-primary text-primary-foreground'
                      : index < currentStepIndex
                      ? 'text-primary hover:bg-primary/10 cursor-pointer' :'text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <Icon 
                    name={step?.icon} 
                    size={16} 
                    className="mr-2"
                  />
                  {step?.label}
                  {index === currentStepIndex && productData && (
                    <div className="ml-2 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  )}
                </button>
                
                {index < workflowSteps?.length - 1 && (
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className={`${
                      index < currentStepIndex ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Mobile Progress Indicator */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {workflowSteps?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    index === currentStepIndex
                      ? 'bg-primary'
                      : index < currentStepIndex
                      ? 'bg-accent' :'bg-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {currentStepIndex + 1} of {workflowSteps?.length}
            </span>
          </div>

          {/* Product Info (if available) */}
          {productData && (
            <div className="hidden lg:flex items-center space-x-2 text-sm">
              <Icon name="Package" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">
                {productData?.name || 'Product'}
              </span>
              {productData?.batchId && (
                <span className="font-data text-muted-foreground">
                  #{productData?.batchId}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowBreadcrumb;