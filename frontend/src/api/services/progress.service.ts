import axios from 'axios';
import { UserProgress, Path } from '../../types/path.types';

export class ProgressService {
  static async getUserProgress(pathId: string): Promise<UserProgress> {
    const response = await axios.get(`/api/progress/${pathId}`);
    return response.data;
  }

  static async updateProgress(pathId: string, stepId: string): Promise<UserProgress> {
    const response = await axios.post(`/api/progress/${pathId}`, { stepId });
    return response.data;
  }

  static async getRecommendedPaths(): Promise<Path[]> {
    const response = await axios.get('/api/paths/recommended');
    return response.data;
  }

  static async getStats(): Promise<UserProgress['stats']> {
    const response = await axios.get('/api/progress/stats');
    return response.data;
  }
} 