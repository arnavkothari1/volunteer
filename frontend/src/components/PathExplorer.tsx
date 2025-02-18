import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { PathService, CategoryService } from '../api';
import LoadingSpinner from './common/LoadingSpinner';
import { handleAPIError } from '../utils/error';
import { AxiosError } from 'axios';
import { SearchParams } from '../api/services/path.service';

interface FilterOptions {
  category?: string;
  difficulty?: string;
  searchQuery?: string;
  duration?: string;
  rating?: number;
  tags?: string[];
  sortBy?: string;
  dateRange?: { start?: Date; end?: Date };
  skillLevel?: string[];
}

interface PathExplorerState {
  selectedDuration: string;
  minimumRating: number;
  selectedTags: string[];
  sortOption: string;
  baseFilters: {
    searchQuery?: string;
    category?: string;
    difficulty?: string;
    dateRange?: { start?: Date; end?: Date };
    skillLevel?: string[];
  };
}

interface Category {
  id: string;
  name: string;
}

interface Path {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
}

export const PathExplorer: React.FC = () => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [state, setState] = useState<PathExplorerState>({
    selectedDuration: '',
    minimumRating: 0,
    selectedTags: [],
    sortOption: 'newest',
    baseFilters: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedSearch = useDebounce(state.baseFilters.searchQuery, 500);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAllCategories();
        setCategories(data);
      } catch (err: unknown) {
        const apiError = handleAPIError(err as AxiosError);
        setError(apiError.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        setLoading(true);
        const searchParams: SearchParams = {
          ...state.baseFilters,
          searchQuery: debouncedSearch || ''
        };
        const data = await PathService.searchPaths(searchParams);
        setPaths(data.paths);
      } catch (err) {
        const apiError = handleAPIError(err as AxiosError);
        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, [debouncedSearch, state.baseFilters]);

  const fetchFilteredPaths = async (filters: FilterOptions) => {
    try {
      setLoading(true);
      const data = await PathService.searchPaths(filters);
      setPaths(data.paths);
    } catch (err) {
      const apiError = handleAPIError(err as AxiosError);
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setState(prev => ({
      ...prev,
      baseFilters: { ...prev.baseFilters, [key]: value }
    }));
  };

  const handleAdvancedFilters = () => {
    const filters = {
      ...state.baseFilters,
      duration: state.selectedDuration,
      rating: state.minimumRating,
      tags: state.selectedTags,
      sortBy: state.sortOption
    };
    
    fetchFilteredPaths(filters);
  };

  const applyAdvancedFilters = () => {
    const queryParams = {
      ...state.baseFilters,
      dateStart: state.baseFilters.dateRange?.start?.toISOString(),
      dateEnd: state.baseFilters.dateRange?.end?.toISOString(),
      skills: state.baseFilters.skillLevel?.join(',')
    };
    
    fetchFilteredPaths(queryParams);
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="path-explorer">
      <div className="filters">
        <input
          type="text"
          placeholder="Search paths..."
          value={state.baseFilters.searchQuery}
          onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
        />
        
        <select
          value={state.baseFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={state.baseFilters.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <button onClick={handleAdvancedFilters}>
          Apply Advanced Filters
        </button>

        <button onClick={applyAdvancedFilters}>
          Apply Filters
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="paths-grid">
          {paths.map((path: Path) => (
            <div key={path.id} className="path-card">
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div className="path-meta">
                <span className="difficulty">{path.difficulty}</span>
                <span className="category">{path.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 