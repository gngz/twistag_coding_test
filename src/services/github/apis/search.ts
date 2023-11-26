import { config } from '@/config';
import { APIRepositoryModel } from '../models/repository';
import { SearchResponseSchema } from '../models/search-response';

/**
 * Searches for repositories based on the given query.
 *
 * @param {string} query - The search query.
 * @param {number} perPage - The number of results per page. Default is 6.
 * @return {Promise<Array<APIRepositoryModel>} An array of repository items matching the search query.
 * @throws {Error} If the search request fails.
 */
export async function searchRepository(
  query: string,
  perPage = 6
): Promise<APIRepositoryModel[]> {
  const url = `${config.githubBaseUrl}/search/repositories?q=${query}&per_page=${perPage}`;
  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (response.ok) {
    const rawData = await response.json();
    const result = SearchResponseSchema.parse(rawData);
    return result.items;
  }

  throw new Error('Failed to search repositories');
}
