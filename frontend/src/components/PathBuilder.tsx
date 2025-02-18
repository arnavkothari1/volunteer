import React, { useState } from 'react';
import { Path, PathStep } from '../types/path.types';

interface PathBuilderProps {
  initialPath?: Path;
}

export const PathBuilder: React.FC<PathBuilderProps> = ({ initialPath }) => {
  const [steps, setSteps] = useState<PathStep[]>(initialPath?.steps || []);
  const [prerequisites, setPrerequisites] = useState<string[]>(initialPath?.prerequisites || []);
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>(initialPath?.learningOutcomes || []);

  const addStep = (newStep: PathStep) => {
    setSteps(prevSteps => [...prevSteps, newStep]);
  };

  const addPrerequisite = (newPrerequisite: string) => {
    setPrerequisites(prevPrerequisites => [...prevPrerequisites, newPrerequisite]);
  };

  const addLearningOutcome = (newLearningOutcome: string) => {
    setLearningOutcomes(prevLearningOutcomes => [...prevLearningOutcomes, newLearningOutcome]);
  };

  return (
    <div className="path-builder">
      <section className="prerequisites">
        <h3>Prerequisites</h3>
        {prerequisites.map((prereq, index) => (
          <div key={index}>{prereq}</div>
        ))}
      </section>
      
      <section className="learning-path">
        <h3>Path Steps</h3>
        {steps.map((step, index) => (
          <div key={step.id} className={`path-step step-${index}`}>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </section>

      <section className="outcomes">
        <h3>Learning Outcomes</h3>
        {learningOutcomes.map((outcome, index) => (
          <div key={index}>{outcome}</div>
        ))}
      </section>

      <button onClick={() => addStep({ id: 'new', title: 'New Step', description: 'Description', type: 'video', duration: '10m', resources: [], completionCriteria: '' })}>
        Add Step
      </button>
      <button onClick={() => addPrerequisite('New Prerequisite')}>Add Prerequisite</button>
      <button onClick={() => addLearningOutcome('New Learning Outcome')}>Add Learning Outcome</button>
    </div>
  );
}; 