import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import TrustBadges from './components/TrustBadges';
import BackgroundGraphics from './components/BackgroundGraphics';
import SecurityIndicators from './components/SecurityIndicators';

const LoginPage = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('ayurtrace_user', JSON.stringify(userData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Graphics */}
      <BackgroundGraphics />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl text-foreground">
                  AyurTrace
                </h1>
                <p className="text-xs text-muted-foreground">
                  Blockchain Provenance Portal
                </p>
              </div>
            </div>
            
            {/* Current Date */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{new Date()?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Welcome Content */}
              <div className="text-center lg:text-left space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                    Verify Authentic
                    <span className="block text-primary">Ayurvedic Products</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                    Track your herbs from farm to shelf with blockchain-powered transparency. 
                    Ensure quality, authenticity, and sustainable sourcing.
                  </p>
                </div>

                {/* Features List */}
                <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm">🔗</span>
                    </div>
                    <span className="text-sm text-foreground">Blockchain Verified</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-accent text-sm">🌿</span>
                    </div>
                    <span className="text-sm text-foreground">Organic Certified</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-secondary text-sm">📱</span>
                    </div>
                    <span className="text-sm text-foreground">QR Code Scanning</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-success text-sm">🧪</span>
                    </div>
                    <span className="text-sm text-foreground">Lab Tested</span>
                  </div>
                </div>

                {/* Security Indicators - Desktop */}
                <div className="hidden lg:block">
                  <SecurityIndicators />
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="w-full">
                <LoginForm onLogin={handleLogin} />
                
                {/* Security Indicators - Mobile */}
                <div className="lg:hidden mt-8">
                  <SecurityIndicators />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Trust Badges */}
            <div className="mb-8">
              <TrustBadges />
            </div>
            
            {/* Footer Content */}
            <div className="border-t border-border pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">
                    © {new Date()?.getFullYear()} AyurTrace Portal. All rights reserved.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Powered by blockchain technology for authentic Ayurvedic products
                  </p>
                </div>
                
                <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                  <a href="#" className="hover:text-foreground transition-smooth">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-foreground transition-smooth">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-foreground transition-smooth">
                    Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;