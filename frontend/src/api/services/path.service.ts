import axios from '../axios';

interface PathData {
  title: string;
  description: string;
  difficulty: string;
  category: string;
  totalSteps: number;
  tags?: string[];
}

export interface SearchParams {
  searchQuery?: string;
  category?: string;
  difficulty?: string;
  dateRange?: { start?: Date; end?: Date };
  skillLevel?: string[];
}

export class PathService {
  static async getAllPaths() {
    const response = await axios.get('/paths');
    return response.data;
  }

  static async getPathById(id: string) {
    const response = await axios.get(`/paths/${id}`);
    return response.data;
  }

  static async createPath(data: PathData) {
    const response = await axios.post('/paths', data);
    return response.data;
  }

  static async updatePath(id: string, data: Partial<PathData>) {
    const response = await axios.put(`/paths/${id}`, data);
    return response.data;
  }

  static async deletePath(id: string) {
    const response = await axios.delete(`/paths/${id}`);
    return response.data;
  }

  static async searchPaths(params: SearchParams) {
    const response = await axios.get('/paths/search', { params });
    return response.data;
  }
} 