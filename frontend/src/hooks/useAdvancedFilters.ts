import { useState, useMemo } from 'react';

// Define a type for the filters
interface Filters {
  [key: string]: string[]; // Assuming filters are key-value pairs where values are arrays of strings
}

interface FilterCombination {
  filters: Filters; // Updated type here
  operator: 'AND' | 'OR';
}

interface FilterState {
  [key: string]: string[]; // Updated type here
}

export const useAdvancedFilters = () => {
  const [filterCombinations, setFilterCombinations] = useState<FilterCombination[]>([]);

  const applyFilterCombination = (newFilters: Record<string, string | string[]>, operator: 'AND' | 'OR') => {
    const formattedFilters: Record<string, string[]> = {};

    // Ensure all values are arrays
    for (const key in newFilters) {
      formattedFilters[key] = Array.isArray(newFilters[key]) 
        ? (newFilters[key] as string[]) 
        : [newFilters[key] as string];
    }

    setFilterCombinations(prev => [...prev, { filters: formattedFilters, operator }]);
  };

  const combinedFilters = useMemo(() => {
    return filterCombinations.reduce((acc: FilterState, { filters, operator }) => {
      if (operator === 'AND') {
        return { ...acc, ...filters };
      }
      return Object.entries(filters).reduce((orAcc: FilterState, [key, value]) => {
        if (!orAcc[key]) orAcc[key] = [];
        // Ensure value is an array and concatenate
        orAcc[key] = [...orAcc[key], ...(Array.isArray(value) ? value : [value])];
        return orAcc;
      }, acc);
    }, {});
  }, [filterCombinations]);

  return {
    filterCombinations,
    applyFilterCombination,
    combinedFilters,
    clearFilters: () => setFilterCombinations([])
  };
}; 