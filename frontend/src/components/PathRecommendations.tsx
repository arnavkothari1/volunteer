import React, { useEffect, useState } from 'react';
import { Path } from '../types/path.types';
import { ProgressService } from '../api/services/progress.service';

export const PathRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Path[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const paths = await ProgressService.getRecommendedPaths();
      setRecommendations(paths);
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations">
      <h3>Recommended Learning Paths</h3>
      <div className="path-grid">
        {recommendations.map(path => (
          <div key={path.id} className="path-card">
            <h4>{path.title}</h4>
            <p>{path.description}</p>
            <div className="path-meta">
              <span>Difficulty: {path.difficulty}</span>
              <span>Duration: {path.estimatedDuration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 