export { AuthService } from './services/auth.service';
export { PathService } from './services/path.service';
export { ProgressService } from './services/progress.service';
export { CategoryService } from './services/category.service';
export { CommentService } from './services/comment.service';

// Export common interfaces
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
} 