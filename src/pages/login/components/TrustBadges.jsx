import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = () => {
  const trustBadges = [
    {
      id: 'blockchain',
      icon: 'Shield',
      label: 'Blockchain Verified',
      description: 'Immutable supply chain records',
      color: 'text-primary'
    },
    {
      id: 'organic',
      icon: 'Leaf',
      label: 'Organic Certified',
      description: 'USDA Organic standards',
      color: 'text-accent'
    },
    {
      id: 'secure',
      icon: 'Lock',
      label: 'SSL Secured',
      description: '256-bit encryption',
      color: 'text-success'
    },
    {
      id: 'verified',
      icon: 'CheckCircle',
      label: 'Lab Tested',
      description: 'Third-party verification',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {trustBadges?.map((badge) => (
        <div
          key={badge?.id}
          className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50 text-center hover:bg-card transition-smooth"
        >
          <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center mx-auto mb-3 ${badge?.color}`}>
            <Icon name={badge?.icon} size={20} />
          </div>
          <h3 className="text-sm font-medium text-foreground mb-1">
            {badge?.label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {badge?.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;