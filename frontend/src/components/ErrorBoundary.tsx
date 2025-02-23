import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-red-600 font-bold">Something went wrong!</h2>
          <pre className="mt-2 text-sm text-red-500">
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 