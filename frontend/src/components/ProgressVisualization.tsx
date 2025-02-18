import React from 'react';
import { UserProgress, Path } from '../types/path.types';

interface ProgressProps {
  path: Path;
  progress: UserProgress;
}

export const ProgressVisualization: React.FC<ProgressProps> = ({ path, progress }) => {
  const completionPercentage = (progress.completedSteps.length / path.steps.length) * 100;

  return (
    <div className="progress-tracker">
      <div className="progress-overview">
        <h3>Your Progress</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <span>{Math.round(completionPercentage)}% Complete</span>
      </div>

      <div className="step-breakdown">
        {path.steps.map(step => (
          <div 
            key={step.id} 
            className={`step ${progress.completedSteps.includes(step.id) ? 'completed' : 
                           progress.currentStep === step.id ? 'current' : ''}`}
          >
            <span className="step-title">{step.title}</span>
            <span className="step-type">{step.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 