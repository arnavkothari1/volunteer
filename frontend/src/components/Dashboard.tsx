import React, { useEffect, useState } from 'react';
import { PathService, ProgressService } from '../api';
import LoadingSpinner from './common/LoadingSpinner';
import { handleAPIError } from '../utils/error';
import { AxiosError } from 'axios';

interface DashboardStats {
  totalPaths: number;
  completedPaths: number;
  inProgressPaths: number;
}

interface Path {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
}

// Define the actual API response type
interface StatsResponse {
  completedPaths: number;
  totalTime: number;
  averageScore: number;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPaths, setRecentPaths] = useState<Path[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, pathsData] = await Promise.all([
          ProgressService.getStats() as Promise<StatsResponse>,
          PathService.getAllPaths()
        ]);

        // Map the API response to our DashboardStats interface
        const completeStats: DashboardStats = {
          totalPaths: pathsData.length, // Use the length of all paths
          completedPaths: statsData.completedPaths,
          inProgressPaths: pathsData.length - statsData.completedPaths, // Calculate in-progress paths
        };

        setStats(completeStats);
        setRecentPaths(pathsData.slice(0, 5));
      } catch (err) {
        if (err instanceof AxiosError) {
          const apiError = handleAPIError(err);
          setError(apiError.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!stats) return null;

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Paths</h3>
          <p>{stats.totalPaths}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{stats.completedPaths}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{stats.inProgressPaths}</p>
        </div>
      </div>

      <div className="recent-paths">
        <h2>Recent Paths</h2>
        {recentPaths.map((path) => (
          <div key={path.id} className="path-card">
            <h3>{path.title}</h3>
            <p>{path.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 