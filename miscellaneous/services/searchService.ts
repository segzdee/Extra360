import axios from 'axios';
import { SearchEntityType } from './searchConfig';

export interface SearchQuery {
  entityType: SearchEntityType;
  filters: Record<string, any>;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  metadata: Record<string, any>;
}

class SearchService {
  private baseUrl = '/api/search';

  async performSearch(query: SearchQuery): Promise<{
    results: SearchResult[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await axios.post(`${this.baseUrl}`, query);
      return response.data;
    } catch (error) {
      console.error('Search failed', error);
      return {
        results: [],
        total: 0,
        page: 1,
        totalPages: 0
      };
    }
  }

  // Save and manage user's search preferences
  async saveSearchPreference(
    entityType: SearchEntityType, 
    filters: Record<string, any>
  ): Promise<boolean> {
    try {
      await axios.post(`${this.baseUrl}/preferences`, {
        entityType,
        filters
      });
      return true;
    } catch (error) {
      console.error('Failed to save search preference', error);
      return false;
    }
  }

  // Get saved search preferences
  async getSavedSearchPreferences(
    entityType: SearchEntityType
  ): Promise<Record<string, any>[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/preferences/${entityType}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to retrieve search preferences', error);
      return [];
    }
  }
}

export default new SearchService();
