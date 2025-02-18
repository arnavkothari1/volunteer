import axios from '../axios';

interface CategoryData {
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

export class CategoryService {
  static async getAllCategories() {
    const response = await axios.get('/categories');
    return response.data;
  }

  static async getCategoryById(id: string) {
    const response = await axios.get(`/categories/${id}`);
    return response.data;
  }

  static async getPathsByCategory(id: string) {
    const response = await axios.get(`/categories/${id}/paths`);
    return response.data;
  }

  static async createCategory(data: CategoryData) {
    const response = await axios.post('/categories', data);
    return response.data;
  }
} 