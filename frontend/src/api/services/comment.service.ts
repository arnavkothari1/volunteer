import axios from '../axios';

interface CommentData {
  content: string;
  rating: number;
}

export class CommentService {
  static async getPathComments(pathId: string) {
    const response = await axios.get(`/paths/${pathId}/comments`);
    return response.data;
  }

  static async addComment(pathId: string, data: CommentData) {
    const response = await axios.post(`/paths/${pathId}/comments`, data);
    return response.data;
  }

  static async updateComment(pathId: string, commentId: string, data: CommentData) {
    const response = await axios.put(`/paths/${pathId}/comments/${commentId}`, data);
    return response.data;
  }

  static async deleteComment(pathId: string, commentId: string) {
    const response = await axios.delete(`/paths/${pathId}/comments/${commentId}`);
    return response.data;
  }
} 