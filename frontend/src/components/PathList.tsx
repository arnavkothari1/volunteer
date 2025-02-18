import React, { useEffect, useState } from 'react';
import { PathService } from '../api';

interface Path {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
}

export const PathList: React.FC = () => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const data = await PathService.getAllPaths();
        setPaths(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load paths');
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="path-list">
      {paths.map((path) => (
        <div key={path.id} className="path-card">
          <h3>{path.title}</h3>
          <p>{path.description}</p>
          <div className="path-meta">
            <span className="difficulty">{path.difficulty}</span>
            <span className="category">{path.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
}; 