import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraInterface = ({ 
  onScanSuccess = () => {},
  onError = () => {},
  isActive = false 
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanningProgress, setScanningProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      setHasPermission(true);
      
      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setHasPermission(false);
      onError('Camera access denied. Please allow camera permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream?.getTracks()?.forEach(track => track?.stop());
      setStream(null);
    }
  };

  const toggleFlash = async () => {
    if (stream) {
      const track = stream?.getVideoTracks()?.[0];
      const capabilities = track?.getCapabilities();
      
      if (capabilities?.torch) {
        try {
          await track?.applyConstraints({
            advanced: [{ torch: !isFlashOn }]
          });
          setIsFlashOn(!isFlashOn);
        } catch (error) {
          console.error('Flash toggle error:', error);
        }
      }
    }
  };

  const captureFrame = () => {
    if (!videoRef?.current || !canvasRef?.current) return;

    const video = videoRef?.current;
    const canvas = canvasRef?.current;
    const context = canvas?.getContext('2d');

    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;
    context?.drawImage(video, 0, 0);

    // Simulate QR code detection
    setIsScanning(true);
    setScanningProgress(0);

    const progressInterval = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsScanning(false);
          
          // Mock successful scan
          const mockQRData = {
            productId: "AYR-" + Math.random()?.toString(36)?.substr(2, 8)?.toUpperCase(),
            batchId: "BTH-" + new Date()?.getFullYear() + "-" + Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0'),
            timestamp: new Date()?.toISOString()
          };
          
          onScanSuccess(mockQRData);
          return 0;
        }
        return prev + 10;
      });
    }, 100);
  };

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-muted rounded-lg border-2 border-dashed border-border">
        <Icon name="Camera" size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Camera Access Required</h3>
        <p className="text-sm text-muted-foreground text-center mb-4 max-w-sm">
          Please allow camera access to scan QR codes. Check your browser settings and try again.
        </p>
        <Button variant="outline" onClick={startCamera} iconName="RefreshCw" iconPosition="left">
          Try Again
        </Button>
      </div>
    );
  }

  if (hasPermission === null) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-muted rounded-lg">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-sm text-muted-foreground">Requesting camera access...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {/* Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-96 object-cover"
      />
      
      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Scanning Frame */}
          <div className="w-64 h-64 border-2 border-primary rounded-lg relative">
            {/* Corner Indicators */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
            
            {/* Scanning Line */}
            {isScanning && (
              <div 
                className="absolute left-0 right-0 h-0.5 bg-accent shadow-lg transition-all duration-100"
                style={{ top: `${scanningProgress}%` }}
              ></div>
            )}
          </div>
          
          {/* Progress Indicator */}
          {isScanning && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                Scanning... {scanningProgress}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Flash Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFlash}
          className="bg-black/50 text-white hover:bg-black/70 w-12 h-12 rounded-full"
        >
          <Icon name={isFlashOn ? "Zap" : "ZapOff"} size={20} />
        </Button>

        {/* Capture Button */}
        <Button
          variant="default"
          size="lg"
          onClick={captureFrame}
          disabled={isScanning}
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
        >
          {isScanning ? (
            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <Icon name="Camera" size={24} />
          )}
        </Button>

        {/* Switch Camera (placeholder) */}
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/70 w-12 h-12 rounded-full"
        >
          <Icon name="RotateCcw" size={20} />
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm text-center">
          Position QR code within the frame
        </div>
      </div>
    </div>
  );
};

export default CameraInterface;