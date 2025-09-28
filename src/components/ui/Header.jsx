import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, onLogout = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const primaryNavItems = [
    { label: 'Dashboard', path: '/retailer-dashboard', icon: 'LayoutDashboard' },
    { label: 'Scan Product', path: '/qr-code-scanner', icon: 'QrCode' },
    { label: 'Reports', path: '/provenance-report', icon: 'FileText' },
  ];

  const secondaryNavItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  if (location?.pathname === '/login') {
    return null;
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigation('/retailer-dashboard')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-lg text-foreground">
                  AyurTrace
                </span>
                <span className="font-caption text-xs text-muted-foreground -mt-1">
                  Portal
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                onClick={() => handleNavigation(item?.path)}
                className="transition-smooth"
              >
                {item?.label}
              </Button>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                iconSize={16}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="transition-smooth"
              >
                More
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
                  <div className="py-1">
                    {secondaryNavItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name={item?.icon} size={16} className="mr-3" />
                        {item?.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-foreground">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {user?.role || 'Retailer'}
                  </span>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              iconName="LogOut"
              iconSize={16}
              onClick={handleLogout}
              className="transition-smooth"
            >
              <span className="hidden sm:inline">Logout</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Menu"
              iconSize={20}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden transition-smooth"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="py-2 space-y-1">
              {primaryNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center w-full px-4 py-3 text-sm transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} className="mr-3" />
                  {item?.label}
                </button>
              ))}
              
              <div className="border-t border-border my-2"></div>
              
              {secondaryNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="flex items-center w-full px-4 py-3 text-sm text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name={item?.icon} size={18} className="mr-3" />
                  {item?.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;