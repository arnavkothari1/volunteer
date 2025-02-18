import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PathExplorer } from '../PathExplorer';
import { PathService } from '../../api';

// Mock the API service
jest.mock('../../api', () => ({
  PathService: {
    searchPaths: jest.fn(),
    getAllPaths: jest.fn()
  }
}));

describe('PathExplorer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and filters', () => {
    render(<PathExplorer />);
    
    expect(screen.getByPlaceholderText('Search paths...')).toBeInTheDocument();
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('All Difficulties')).toBeInTheDocument();
  });

  it('searches paths when input changes', async () => {
    const mockPaths = [{ id: '1', title: 'Test Path', description: 'Test' }];
    (PathService.searchPaths as jest.Mock).mockResolvedValueOnce({ paths: mockPaths });

    render(<PathExplorer />);
    
    const searchInput = screen.getByPlaceholderText('Search paths...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(PathService.searchPaths).toHaveBeenCalledWith(
        expect.objectContaining({ searchQuery: 'test' })
      );
    });
  });
}); 