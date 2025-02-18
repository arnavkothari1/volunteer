// Define an interface for the expected structure of data
interface PathData {
  title?: string;
  description?: string;
  totalSteps: number;
  tags?: string[];
  category?: string;
  resourceUrl?: string;
}

export const validatePath = (data: PathData) => {
  const errors: Record<string, string> = {};

  // Title validation
  if (!data.title?.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (data.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  // Description validation
  if (!data.description?.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  // Steps validation
  if (data.totalSteps < 1) {
    errors.totalSteps = 'Must have at least 1 step';
  } else if (data.totalSteps > 50) {
    errors.totalSteps = 'Cannot exceed 50 steps';
  }

  // Tags validation
  if (data.tags && data.tags.length > 10) {
    errors.tags = 'Maximum 10 tags allowed';
  }
  if (data.tags && data.tags.some((tag: string) => tag.length > 20)) {
    errors.tags = 'Tags must be less than 20 characters';
  }

  // Category validation
  if (!data.category) {
    errors.category = 'Category is required';
  }

  // URL validation
  if (data.resourceUrl && !isValidUrl(data.resourceUrl)) {
    errors.resourceUrl = 'Invalid URL format';
  }

  return errors;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
}; 