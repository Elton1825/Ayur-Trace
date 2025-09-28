import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationContext = ({ 
  user = null, 
  onLogout = () => {},
  showTrustBadge = true 
}) => {
  const [isSecure, setIsSecure] = useState(false);

  useEffect(() => {
    // Simulate security check
    const checkSecurity = () => {
      setIsSecure(window.location?.protocol === 'https:' || window.location?.hostname === 'localhost');
    };
    
    checkSecurity();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* User Context */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={12} color="white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">
                {user?.name || 'User'}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground capitalize">
                {user?.role || 'Retailer'} Account
              </span>
            </div>
          </div>

          {/* Trust & Security Indicators */}
          <div className="flex items-center space-x-4">
            {showTrustBadge && (
              <div className="hidden sm:flex items-center space-x-2">
                {isSecure && (
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <Icon name="Shield" size={14} />
                    <span>Secure</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1 text-xs text-accent">
                  <Icon name="CheckCircle" size={14} />
                  <span>Verified</span>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-primary">
                  <Icon name="Leaf" size={14} />
                  <span>Blockchain</span>
                </div>
              </div>
            )}

            {/* Session Info */}
            <div className="hidden md:flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>Session Active</span>
            </div>

            {/* Quick Logout */}
            <Button
              variant="ghost"
              size="xs"
              iconName="LogOut"
              iconSize={14}
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <span className="hidden sm:inline ml-1">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationContext;