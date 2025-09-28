import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageUploadZone = ({ 
  onScanSuccess = () => {},
  onError = () => {},
  isActive = false 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileUpload(files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    // Validate file type
    if (!file?.type?.startsWith('image/')) {
      onError('Please upload a valid image file (JPG, PNG, GIF).');
      return;
    }

    // Validate file size (max 10MB)
    if (file?.size > 10 * 1024 * 1024) {
      onError('File size must be less than 10MB.');
      return;
    }

    setIsProcessing(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e?.target?.result);
      
      // Simulate QR code processing
      setTimeout(() => {
        const mockQRData = {
          productId: "AYR-" + Math.random()?.toString(36)?.substr(2, 8)?.toUpperCase(),
          batchId: "BTH-" + new Date()?.getFullYear() + "-" + Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0'),
          timestamp: new Date()?.toISOString(),
          source: 'upload'
        };
        
        setIsProcessing(false);
        onScanSuccess(mockQRData);
      }, 2000);
    };
    
    reader.onerror = () => {
      setIsProcessing(false);
      onError('Failed to read the uploaded file. Please try again.');
    };
    
    reader?.readAsDataURL(file);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const clearUpload = () => {
    setUploadedImage(null);
    setIsProcessing(false);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50 hover:bg-muted/50'
        } ${isProcessing ? 'pointer-events-none' : 'cursor-pointer'}`}
        onClick={!isProcessing ? openFileDialog : undefined}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Processing Image</h3>
              <p className="text-sm text-muted-foreground">
                Analyzing QR code and verifying on blockchain...
              </p>
            </div>
          </div>
        ) : uploadedImage ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={uploadedImage}
                alt="Uploaded QR code"
                className="max-w-full max-h-64 rounded-lg shadow-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e?.stopPropagation();
                  clearUpload();
                }}
                className="absolute -top-2 -right-2 bg-error text-error-foreground hover:bg-error/90 w-8 h-8 rounded-full"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Image Uploaded</h3>
              <p className="text-sm text-muted-foreground">
                Click to upload a different image or wait for processing
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Upload" size={32} className="text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Upload QR Code Image
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Drag and drop your QR code image here, or click to browse files
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="FileImage" size={14} />
                <span>JPG, PNG, GIF</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="HardDrive" size={14} />
                <span>Max 10MB</span>
              </div>
            </div>
          </div>
        )}

        {/* Drag Overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="Download" size={48} className="text-primary mx-auto mb-2" />
              <p className="text-lg font-semibold text-primary">Drop image here</p>
            </div>
          </div>
        )}
      </div>
      {/* Alternative Actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          onClick={openFileDialog}
          disabled={isProcessing}
          iconName="FolderOpen"
          iconPosition="left"
        >
          Browse Files
        </Button>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>or</span>
        </div>
        
        <Button
          variant="ghost"
          disabled={isProcessing}
          iconName="Keyboard"
          iconPosition="left"
          className="text-primary hover:text-primary/80"
        >
          Enter Code Manually
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadZone;