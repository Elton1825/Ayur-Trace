import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ManualCodeEntry = ({ 
  onCodeSubmit = () => {},
  onCancel = () => {},
  isVisible = false 
}) => {
  const [codeInput, setCodeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!codeInput?.trim()) {
      setError('Please enter a product code');
      return;
    }

    // Basic validation for code format
    const codePattern = /^[A-Z]{3}-[A-Z0-9]{6,8}$/;
    if (!codePattern?.test(codeInput?.trim()?.toUpperCase())) {
      setError('Invalid code format. Expected format: ABC-123456');
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = {
        productId: codeInput?.trim()?.toUpperCase(),
        batchId: "BTH-" + new Date()?.getFullYear() + "-" + Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0'),
        timestamp: new Date()?.toISOString(),
        source: 'manual'
      };
      
      onCodeSubmit(mockData);
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value?.toUpperCase();
    setCodeInput(value);
    if (error) setError('');
  };

  const handleClear = () => {
    setCodeInput('');
    setError('');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Keyboard" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Enter Product Code
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          If the QR code is damaged or unreadable, you can manually enter the product code found on the packaging
        </p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            label="Product Code"
            type="text"
            placeholder="e.g., AYR-TRM001"
            value={codeInput}
            onChange={handleInputChange}
            error={error}
            disabled={isProcessing}
            required
            className="text-center font-data text-lg"
            description="Enter the code exactly as shown on the product packaging"
          />
        </div>

        {/* Code Format Guide */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
            <Icon name="Info" size={16} className="mr-2 text-primary" />
            Code Format Guide
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-accent" />
              <span>Format: <span className="font-data">ABC-123456</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-accent" />
              <span>3 letters, dash, 6-8 characters</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-accent" />
              <span>Usually found below the QR code</span>
            </div>
          </div>
        </div>

        {/* Example Codes */}
        <div className="border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Example Codes:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['AYR-TRM001', 'AYR-ASH002', 'AYR-NEM003', 'AYR-BRM004']?.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCodeInput(code)}
                disabled={isProcessing}
                className="text-left p-2 rounded border border-border hover:border-primary hover:bg-primary/5 transition-colors font-data text-sm"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            type="submit"
            variant="default"
            disabled={!codeInput?.trim() || isProcessing}
            loading={isProcessing}
            iconName="Search"
            iconPosition="left"
            className="flex-1"
          >
            {isProcessing ? 'Verifying...' : 'Verify Code'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={isProcessing}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isProcessing}
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
        </div>
      </form>
      {/* Help Text */}
      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Can't find the product code? Contact our support team for assistance
        </p>
        <Button
          variant="ghost"
          size="sm"
          iconName="HelpCircle"
          iconPosition="left"
          className="mt-2 text-primary hover:text-primary/80"
        >
          Get Help
        </Button>
      </div>
    </div>
  );
};

export default ManualCodeEntry;