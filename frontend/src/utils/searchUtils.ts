interface SearchResult {
  id: string;
  title: string;
  description: string;
  relevance: number;
}

export async function searchFunction(query: string): Promise<SearchResult[]> {
  // Implement your search logic here
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  return response.json();
} 