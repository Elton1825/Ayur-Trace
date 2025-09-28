import React from 'react';
import Icon from '../../../components/AppIcon';

const BackgroundGraphics = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Icon name="Leaf" size={120} className="text-primary" />
      </div>
      
      <div className="absolute top-20 right-16 opacity-5">
        <Icon name="TreePine" size={80} className="text-secondary" />
      </div>
      
      <div className="absolute bottom-20 left-20 opacity-8">
        <Icon name="Flower" size={60} className="text-accent" />
      </div>
      
      <div className="absolute bottom-10 right-10 opacity-10">
        <Icon name="Sprout" size={100} className="text-primary" />
      </div>

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/30 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-secondary/15 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse delay-1500"></div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/3 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/3 via-transparent to-transparent"></div>
    </div>
  );
};

export default BackgroundGraphics;