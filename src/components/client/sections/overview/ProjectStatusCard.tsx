
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

interface ProjectStatusCardProps {
  projectStatus: string;
  projectPhase: string;
  projectCompletion: number;
}

const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({
  projectStatus,
  projectPhase,
  projectCompletion
}) => {
  return (
    <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarIcon size={18} className="text-gold" />
          Project Status
        </CardTitle>
        <CardDescription className="text-white/60">
          Current phase of your project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span>Status:</span>
            <span className="font-semibold text-gold">{projectStatus}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Current Phase:</span>
            <span className="font-semibold text-gold">{projectPhase}</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-navy-200 rounded-full h-2">
              <div 
                className="bg-gold h-2 rounded-full" 
                style={{ width: `${projectCompletion}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-white/70">
              <span>0%</span>
              <span>{projectCompletion}% Complete</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatusCard;
