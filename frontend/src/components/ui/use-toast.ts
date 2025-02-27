import { useCallback } from 'react';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

export const toast = {
  success: (message: string) => {
    console.log('Success:', message);
    // You can replace this with a proper toast library later
  },
  error: (message: string) => {
    console.log('Error:', message);
    // You can replace this with a proper toast library later
  }
};

export function useToast() {
  const showToast = useCallback(({ title, description, duration = 3000 }: ToastOptions) => {
    console.log({ title, description, duration });
    // You can replace this with a proper toast library later
  }, []);

  return { toast: showToast };
} 