import { SearchResponseSchema } from '../models/search-response';

export async function searchRepo(query: string, perPage = 6) {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&per_page=${perPage}`,
      {}
    );

    const rawData = await response.json();
    if (response.ok) {
      const result = SearchResponseSchema.parse(rawData);
      return result.items;
    }
  } catch (error) {
    throw error;
  }
}
