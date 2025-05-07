import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const ProcessSection: React.FC = () => {
  // This would come from your backend in a real implementation
  const projectSteps = [
    { id: 1, name: 'Initial Inspection', status: 'completed', date: '04/10/2025' },
    { id: 2, name: 'Estimate Approval', status: 'completed', date: '04/12/2025' },
    { id: 3, name: 'Contract Signing', status: 'current', date: 'Pending' },
    { id: 4, name: 'Material Selection', status: 'pending', date: 'TBD' },
    { id: 5, name: 'Project Scheduling', status: 'pending', date: 'TBD' },
    { id: 6, name: 'Construction Phase', status: 'pending', date: 'TBD' },
    { id: 7, name: 'Final Inspection', status: 'pending', date: 'TBD' },
    { id: 8, name: 'Project Completion', status: 'pending', date: 'TBD' }
  ];

  const getStepIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 size={20} className="text-green-400" />;
      case 'current':
        return <Clock size={20} className="text-gold" />;
      default:
        return <Circle size={20} className="text-white/30" />;
    }
  };

  const estimatedCompletion = "May 15, 2025"; // This would be dynamic in a real app

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Project Status</h1>
        <p className="text-white/70">
          Track the progress of your project with The Dirty Roofer
        </p>
      </div>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription className="text-white/60">
            Estimated completion: {estimatedCompletion}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mt-2">
            {projectSteps.map((step, index) => (
              <div key={step.id} className="flex mb-6 last:mb-0">
                <div className="mr-4 flex flex-col items-center">
                  <div>
                    {getStepIcon(step.status)}
                  </div>
                  {index < projectSteps.length - 1 && (
                    <div className={`w-0.5 h-full ${
                      step.status === 'completed' ? 'bg-green-400' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`font-medium ${
                      step.status === 'completed' ? 'text-green-400' : 
                      step.status === 'current' ? 'text-gold' : 'text-white/70'
                    }`}>
                      {step.name}
                    </h3>
                    <span className="text-white/50 text-sm">{step.date}</span>
                  </div>
                  {step.status === 'current' && (
                    <p className="text-sm text-white/70 mt-1">
                      This step is currently in progress. We'll notify you when it's completed.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessSection;
