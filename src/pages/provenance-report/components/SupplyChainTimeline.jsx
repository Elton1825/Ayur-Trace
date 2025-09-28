import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupplyChainTimeline = ({ timelineData = [] }) => {
  const [expandedStage, setExpandedStage] = useState(null);

  const defaultTimelineData = [
    {
      id: 'collection',
      title: 'Collection',
      date: '10/20/2024',
      status: 'completed',
      icon: 'Sprout',
      location: 'Kerala, India',
      details: {
        description: 'Organic turmeric harvested from certified farms in Kerala using traditional methods.',
        farmer: 'Ravi Kumar',
        cooperative: 'Kerala Organic Farmers Collective',
        harvestMethod: 'Hand-picked at optimal maturity',
        gpsCoordinates: { lat: 10.8505, lng: 76.2711 },
        certifications: ['Organic', 'Fair Trade']
      }
    },
    {
      id: 'processing',
      title: 'Processing',
      date: '10/25/2024',
      status: 'completed',
      icon: 'Settings',
      location: 'Processing Unit, Kochi',
      details: {
        description: 'Traditional sun-drying followed by stone grinding to preserve natural oils and nutrients.',
        methods: ['Sun-drying for 7 days', 'Stone grinding', 'Sieving through 80-mesh'],
        temperature: '45°C max during drying',
        duration: '5 days processing time',
        qualityChecks: ['Moisture content', 'Color consistency', 'Particle size']
      }
    },
    {
      id: 'testing',
      title: 'Lab Testing',
      date: '11/01/2024',
      status: 'completed',
      icon: 'FlaskConical',
      location: 'Certified Lab, Mumbai',
      details: {
        description: 'Comprehensive laboratory testing for purity, potency, and safety parameters.',
        tests: [
          { name: 'Moisture Content', result: '8.2%', standard: '<10%', status: 'pass' },
          { name: 'Pesticide Residue', result: 'Not Detected', standard: 'Below LOD', status: 'pass' },
          { name: 'Heavy Metals', result: 'Within Limits', standard: 'USP Standards', status: 'pass' },
          { name: 'Curcumin Content', result: '3.8%', standard: '>3%', status: 'pass' }
        ],
        labCertificate: 'LAB-TUR-2024-0892.pdf'
      }
    },
    {
      id: 'packaging',
      title: 'Packaging',
      date: '12/15/2024',
      status: 'completed',
      icon: 'Package',
      location: 'Packaging Facility, Bangalore',
      details: {
        description: 'Eco-friendly packaging in controlled environment to maintain product integrity.',
        packagingType: 'Food-grade aluminum pouches with nitrogen flushing',
        batchSize: '500 kg',
        expiryDate: '12/15/2026',
        storageConditions: 'Store in cool, dry place below 25°C',
        sustainability: ['Recyclable packaging', 'Minimal plastic use', 'Carbon-neutral shipping']
      }
    }
  ];

  const stages = timelineData?.length > 0 ? timelineData : defaultTimelineData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-accent bg-accent';
      case 'in-progress':
        return 'text-warning bg-warning';
      case 'pending':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const toggleExpanded = (stageId) => {
    setExpandedStage(expandedStage === stageId ? null : stageId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Supply Chain Journey
        </h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Tracked from farm to package</span>
        </div>
      </div>
      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-border"></div>
          <div className="absolute top-8 left-8 h-0.5 bg-accent" style={{ width: '100%' }}></div>

          <div className="grid grid-cols-4 gap-4">
            {stages?.map((stage, index) => (
              <div key={stage?.id} className="relative">
                {/* Timeline Node */}
                <div className={`w-16 h-16 rounded-full border-4 border-white ${getStatusColor(stage?.status)} flex items-center justify-center mb-4 mx-auto card-shadow`}>
                  <Icon name={stage?.icon} size={24} color="white" />
                </div>

                {/* Stage Content */}
                <div className="text-center mb-4">
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {stage?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">{stage?.date}</p>
                  <p className="text-xs text-muted-foreground">{stage?.location}</p>
                </div>

                {/* Expandable Details */}
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={expandedStage === stage?.id ? "ChevronUp" : "ChevronDown"}
                    iconPosition="right"
                    iconSize={14}
                    onClick={() => toggleExpanded(stage?.id)}
                    className="transition-smooth"
                  >
                    {expandedStage === stage?.id ? 'Less Details' : 'View Details'}
                  </Button>
                </div>

                {/* Expanded Content */}
                {expandedStage === stage?.id && (
                  <div className="mt-4 p-4 bg-muted rounded-lg text-left">
                    <p className="text-sm text-foreground mb-3">{stage?.details?.description}</p>
                    
                    {stage?.details?.tests && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground text-sm">Test Results:</h4>
                        {stage?.details?.tests?.map((test, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">{test?.name}:</span>
                            <span className={`font-medium ${test?.status === 'pass' ? 'text-accent' : 'text-error'}`}>
                              {test?.result}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {stage?.details?.methods && (
                      <div className="mt-3">
                        <h4 className="font-medium text-foreground text-sm mb-2">Processing Methods:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {stage?.details?.methods?.map((method, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <Icon name="Check" size={12} className="text-accent" />
                              <span>{method}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Timeline */}
      <div className="md:hidden space-y-4">
        {stages?.map((stage, index) => (
          <div key={stage?.id} className="relative">
            {/* Timeline Line */}
            {index < stages?.length - 1 && (
              <div className="absolute left-8 top-16 w-0.5 h-full bg-border"></div>
            )}

            <div className="flex items-start space-x-4">
              {/* Timeline Node */}
              <div className={`w-16 h-16 rounded-full border-4 border-white ${getStatusColor(stage?.status)} flex items-center justify-center card-shadow flex-shrink-0`}>
                <Icon name={stage?.icon} size={20} color="white" />
              </div>

              {/* Stage Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <h3 className="font-heading font-semibold text-foreground">
                    {stage?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{stage?.date}</p>
                  <p className="text-xs text-muted-foreground">{stage?.location}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName={expandedStage === stage?.id ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => toggleExpanded(stage?.id)}
                  className="transition-smooth mb-2"
                >
                  {expandedStage === stage?.id ? 'Less Details' : 'View Details'}
                </Button>

                {/* Expanded Content */}
                {expandedStage === stage?.id && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-foreground mb-3">{stage?.details?.description}</p>
                    
                    {stage?.details?.tests && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground text-sm">Test Results:</h4>
                        {stage?.details?.tests?.map((test, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">{test?.name}:</span>
                            <span className={`font-medium ${test?.status === 'pass' ? 'text-accent' : 'text-error'}`}>
                              {test?.result}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {stage?.details?.methods && (
                      <div className="mt-3">
                        <h4 className="font-medium text-foreground text-sm mb-2">Processing Methods:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {stage?.details?.methods?.map((method, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <Icon name="Check" size={12} className="text-accent" />
                              <span>{method}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplyChainTimeline;