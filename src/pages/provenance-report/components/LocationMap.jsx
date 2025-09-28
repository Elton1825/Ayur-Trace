import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ 
  locationData = {},
  showFarmerProfile = true 
}) => {
  const [mapView, setMapView] = useState('roadmap');

  const defaultLocationData = {
    farmName: 'Green Valley Organic Farm',
    coordinates: { lat: 10.8505, lng: 76.2711 },
    address: 'Munnar Hills, Kerala, India',
    farmer: {
      name: 'Ravi Kumar',
      experience: '15 years',
      cooperative: 'Kerala Organic Farmers Collective',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      story: `Ravi has been practicing organic farming for over 15 years in the pristine hills of Munnar. His family has been cultivating turmeric using traditional methods passed down through generations.\n\nThe farm follows strict organic practices, using only natural fertilizers and pest control methods. Ravi is a certified member of the Kerala Organic Farmers Collective, which ensures fair trade practices and sustainable farming.`
    },
    certifications: [
      { name: 'Organic Certified', icon: 'Leaf', verified: true },
      { name: 'Fair Trade', icon: 'Handshake', verified: true },
      { name: 'Biodiversity Safe', icon: 'TreePine', verified: true }
    ],
    harvestDetails: {
      season: 'Winter 2024',
      method: 'Hand-picked at optimal maturity',
      yield: '2.5 tons per hectare',
      soilType: 'Red laterite soil, rich in minerals'
    }
  };

  const location = { ...defaultLocationData, ...locationData };

  const mapViews = [
    { id: 'roadmap', label: 'Road', icon: 'Map' },
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', label: 'Terrain', icon: 'Mountain' }
  ];

  const getMapUrl = () => {
    const { lat, lng } = location?.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Collection Location
        </h2>
        <div className="flex items-center space-x-2">
          {mapViews?.map((view) => (
            <Button
              key={view?.id}
              variant={mapView === view?.id ? "default" : "ghost"}
              size="sm"
              iconName={view?.icon}
              iconPosition="left"
              iconSize={14}
              onClick={() => setMapView(view?.id)}
              className="transition-smooth"
            >
              {view?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Section */}
        <div className="space-y-4">
          <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={location?.farmName}
              referrerPolicy="no-referrer-when-downgrade"
              src={getMapUrl()}
              className="w-full h-full"
            />
            
            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="font-medium text-foreground text-sm">
                  {location?.farmName}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {location?.address}
              </p>
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Navigation" size={14} className="text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">Coordinates</span>
              </div>
              <p className="font-data text-xs text-muted-foreground">
                {location?.coordinates?.lat?.toFixed(4)}, {location?.coordinates?.lng?.toFixed(4)}
              </p>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">Harvest Season</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {location?.harvestDetails?.season}
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-medium text-foreground mb-3 text-sm">Farm Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {location?.certifications?.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-2 bg-accent/10 text-accent rounded-full"
                >
                  <Icon name={cert?.icon} size={14} />
                  <span className="text-xs font-medium">{cert?.name}</span>
                  {cert?.verified && (
                    <Icon name="CheckCircle" size={12} className="text-accent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Farmer Profile Section */}
        {showFarmerProfile && (
          <div className="space-y-4">
            <h3 className="font-medium text-foreground text-sm">Farmer Profile</h3>
            
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                <img
                  src={location?.farmer?.photo}
                  alt={location?.farmer?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-semibold text-foreground">
                  {location?.farmer?.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-1">
                  {location?.farmer?.experience} of organic farming
                </p>
                <p className="text-xs text-muted-foreground">
                  {location?.farmer?.cooperative}
                </p>
              </div>
            </div>

            {/* Farmer Story */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-foreground mb-2 text-sm">Farmer's Story</h4>
              <div className="text-xs text-muted-foreground space-y-2">
                {location?.farmer?.story?.split('\n\n')?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Harvest Details */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground text-sm">Harvest Details</h4>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Sprout" size={14} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Method</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {location?.harvestDetails?.method}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Yield</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {location?.harvestDetails?.yield}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Layers" size={14} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Soil Type</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {location?.harvestDetails?.soilType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;