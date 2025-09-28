import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SustainabilityBadges = ({ 
  sustainabilityData = {},
  onViewCertificate = () => {}
}) => {
  const [expandedBadge, setExpandedBadge] = useState(null);

  const defaultSustainabilityData = {
    overallScore: 92,
    badges: [
      {
        id: 'organic',
        name: 'Organic Certified',
        icon: 'Leaf',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent/20',
        status: 'verified',
        certifyingBody: 'USDA Organic',
        validUntil: '12/2025',
        certificateNumber: 'ORG-2024-TUR-001',
        description: 'Certified organic product grown without synthetic pesticides, herbicides, or fertilizers.',
        criteria: [
          'No synthetic chemicals used',
          'Soil health maintained through organic practices',
          'Regular third-party inspections',
          'Traceable supply chain documentation'
        ],
        impact: {
          environmental: 'Reduces soil and water contamination by 85%',
          health: 'No pesticide residues detected',
          biodiversity: 'Supports 40% more beneficial insects'
        }
      },
      {
        id: 'fairtrade',
        name: 'Fair Trade Certified',
        icon: 'Handshake',
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/20',
        status: 'verified',
        certifyingBody: 'Fair Trade USA',
        validUntil: '06/2025',
        certificateNumber: 'FT-2024-TUR-002',
        description: 'Ensures fair wages and working conditions for farmers and workers in the supply chain.',
        criteria: [
          'Fair minimum prices paid to farmers',
          'Safe working conditions maintained',
          'Community development programs supported',
          'Democratic organization of farmers'
        ],
        impact: {
          social: '150 farming families benefited',
          economic: '25% premium paid above market price',
          community: '$15,000 invested in local infrastructure'
        }
      },
      {
        id: 'biodiversity',
        name: 'Biodiversity Safe',
        icon: 'TreePine',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20',
        status: 'verified',
        certifyingBody: 'Rainforest Alliance',
        validUntil: '09/2025',
        certificateNumber: 'BIO-2024-TUR-003',
        description: 'Farming practices that protect and enhance biodiversity and ecosystem health.',
        criteria: [
          'Wildlife habitat conservation',
          'Native species protection',
          'Sustainable water management',
          'Integrated pest management'
        ],
        impact: {
          biodiversity: '12 native bird species protected',
          ecosystem: '95% natural habitat preserved',
          water: '30% reduction in water usage'
        }
      },
      {
        id: 'carbon-neutral',
        name: 'Carbon Neutral',
        icon: 'Recycle',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent/20',
        status: 'verified',
        certifyingBody: 'Carbon Trust',
        validUntil: '12/2024',
        certificateNumber: 'CN-2024-TUR-004',
        description: 'Net-zero carbon emissions achieved through sustainable practices and carbon offsetting.',
        criteria: [
          'Carbon footprint measurement',
          'Emission reduction strategies',
          'Renewable energy usage',
          'Verified carbon offset projects'
        ],
        impact: {
          emissions: '2.5 tons CO2 offset per batch',
          energy: '80% renewable energy used',
          transport: 'Local sourcing reduces transport emissions'
        }
      }
    ]
  };

  const data = { ...defaultSustainabilityData, ...sustainabilityData };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-accent';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'expired':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const toggleExpanded = (badgeId) => {
    setExpandedBadge(expandedBadge === badgeId ? null : badgeId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Sustainability & Certifications
        </h2>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Sustainability Score</p>
            <p className={`text-2xl font-bold ${getScoreColor(data?.overallScore)}`}>
              {data?.overallScore}/100
            </p>
          </div>
          <div className={`w-16 h-16 rounded-full border-4 ${getScoreColor(data?.overallScore)} border-current flex items-center justify-center`}>
            <Icon name="Award" size={24} className={getScoreColor(data?.overallScore)} />
          </div>
        </div>
      </div>
      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {data?.badges?.map((badge) => (
          <div
            key={badge?.id}
            className={`border ${badge?.borderColor} rounded-lg p-4 ${badge?.bgColor} transition-smooth hover:scale-105`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full ${badge?.bgColor} border ${badge?.borderColor} flex items-center justify-center`}>
                  <Icon name={badge?.icon} size={20} className={badge?.color} />
                </div>
                <div>
                  <h3 className={`font-heading font-semibold ${badge?.color}`}>
                    {badge?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {badge?.certifyingBody}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(badge?.status)} 
                  size={16} 
                  className={badge?.status === 'verified' ? 'text-accent' : 'text-muted-foreground'} 
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={expandedBadge === badge?.id ? "ChevronUp" : "ChevronDown"}
                  iconSize={14}
                  onClick={() => toggleExpanded(badge?.id)}
                  className={`${badge?.color} hover:bg-black/10`}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {badge?.description}
            </p>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Valid until: {badge?.validUntil}
              </span>
              <Button
                variant="ghost"
                size="xs"
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={12}
                onClick={() => onViewCertificate(badge)}
                className={`${badge?.color} hover:bg-black/10`}
              >
                View Certificate
              </Button>
            </div>

            {/* Expanded Content */}
            {expandedBadge === badge?.id && (
              <div className="mt-4 pt-4 border-t border-current/20 space-y-4">
                {/* Criteria */}
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Certification Criteria</h4>
                  <ul className="space-y-1">
                    {badge?.criteria?.map((criterion, index) => (
                      <li key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="Check" size={12} className={badge?.color} />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Environmental & Social Impact</h4>
                  <div className="space-y-2">
                    {Object.entries(badge?.impact)?.map(([key, value]) => (
                      <div key={key} className="flex items-start space-x-2">
                        <Icon name="TrendingUp" size={12} className={badge?.color} />
                        <div>
                          <span className="text-xs font-medium text-foreground capitalize">{key}: </span>
                          <span className="text-xs text-muted-foreground">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-3 bg-black/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-foreground">Certificate Number</p>
                      <p className="font-data text-xs text-muted-foreground">{badge?.certificateNumber}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Download"
                      iconPosition="left"
                      iconSize={12}
                      onClick={() => onViewCertificate(badge)}
                      className="transition-smooth"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Sustainability Summary */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Award" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-2">Sustainability Commitment</h3>
            <p className="text-sm text-muted-foreground mb-3">
              This product meets the highest standards for environmental sustainability, social responsibility, 
              and ethical sourcing. Our comprehensive certification program ensures transparency and 
              accountability throughout the entire supply chain.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="text-center p-2 bg-accent/10 rounded-lg">
                <p className="font-semibold text-accent">Environmental</p>
                <p className="text-muted-foreground">85% impact reduction</p>
              </div>
              <div className="text-center p-2 bg-secondary/10 rounded-lg">
                <p className="font-semibold text-secondary">Social</p>
                <p className="text-muted-foreground">150 families supported</p>
              </div>
              <div className="text-center p-2 bg-primary/10 rounded-lg">
                <p className="font-semibold text-primary">Economic</p>
                <p className="text-muted-foreground">25% fair trade premium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityBadges;