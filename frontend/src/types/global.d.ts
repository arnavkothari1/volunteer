interface Window {
  gtag: (
    command: string,
    params: string,
    options?: {
      event_category?: string;
      event_label?: string;
      value?: number;
      page_path?: string;
      [key: string]: string | number | boolean | undefined;
    }
  ) => void;
} 