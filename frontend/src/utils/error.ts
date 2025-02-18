import { AxiosError } from 'axios';

export class APIError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Define an interface for the expected error response data
interface ErrorResponse {
  message: string;
  // Add other properties as needed
}

export const handleAPIError = (error: AxiosError): APIError => {
  if (error.response) {
    const errorData = error.response.data as ErrorResponse; // Type assertion
    return new APIError(
      errorData.message || 'An error occurred',
      error.response.status
    );
  }
  return new APIError('Network error', 500);
}; 