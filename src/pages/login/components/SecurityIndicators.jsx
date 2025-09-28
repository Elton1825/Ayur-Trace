import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const [securityStatus, setSecurityStatus] = useState({
    ssl: false,
    connection: false,
    verified: false
  });

  useEffect(() => {
    // Simulate security checks
    const checkSecurity = () => {
      setTimeout(() => setSecurityStatus(prev => ({ ...prev, ssl: true })), 500);
      setTimeout(() => setSecurityStatus(prev => ({ ...prev, connection: true })), 1000);
      setTimeout(() => setSecurityStatus(prev => ({ ...prev, verified: true })), 1500);
    };

    checkSecurity();
  }, []);

  const indicators = [
    {
      id: 'ssl',
      icon: 'Shield',
      label: 'SSL Secured',
      status: securityStatus?.ssl,
      description: 'Your connection is encrypted'
    },
    {
      id: 'connection',
      icon: 'Wifi',
      label: 'Secure Connection',
      status: securityStatus?.connection,
      description: 'Protected data transmission'
    },
    {
      id: 'verified',
      icon: 'CheckCircle',
      label: 'Platform Verified',
      status: securityStatus?.verified,
      description: 'Authenticated service provider'
    }
  ];

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/30">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Lock" size={16} className="text-success" />
        <span className="text-sm font-medium text-foreground">Security Status</span>
      </div>
      <div className="space-y-2">
        {indicators?.map((indicator) => (
          <div key={indicator?.id} className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-smooth ${
              indicator?.status 
                ? 'bg-success text-success-foreground' 
                : 'bg-muted animate-pulse'
            }`}>
              {indicator?.status ? (
                <Icon name="Check" size={10} />
              ) : (
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={indicator?.icon} 
                  size={14} 
                  className={indicator?.status ? 'text-success' : 'text-muted-foreground'} 
                />
                <span className={`text-xs font-medium ${
                  indicator?.status ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {indicator?.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {indicator?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityIndicators;