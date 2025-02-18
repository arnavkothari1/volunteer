import { ObjectSchema, AnyObject } from 'yup';

export interface FormStatus {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormProps<T extends AnyObject> {
  onSubmit: (values: T) => Promise<void>;
  initialValues?: Partial<T>;
  validationSchema?: ObjectSchema<T>;
  children?: React.ReactNode;
}

export interface SearchResult {
  id: string;
  title: string;
  type: string;
}
