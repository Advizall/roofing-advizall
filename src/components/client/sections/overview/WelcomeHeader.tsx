
import React from 'react';

interface WelcomeHeaderProps {
  clientName: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ clientName }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">
        Welcome back, {clientName || 'Client'}
      </h1>
      <p className="text-white/70">
        Here's an overview of your project with PACC Solutions
      </p>
    </div>
  );
};

export default WelcomeHeader;
