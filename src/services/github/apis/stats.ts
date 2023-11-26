import { config } from '@/config';
import {
  CommitHistoryModel,
  CommitHistoryResponseSchema,
} from '../models/commit-history-response';

/**
 * Retrieves the commit history for a given repository.
 *
 * @param {string} repoName - The name of the repository.
 * @return {Promise<CommitHistoryModel>} A promise that resolves to the commit history model.
 * @throws {Error} If the search request fails.
 */
export async function getRepositoryCommitHistory(
  repoName: string
): Promise<CommitHistoryModel> {
  try {
    const url = `${config.githubBaseUrl}/repos/${repoName}/stats/participation`;
    const options = {
      next: {
        revalidate: 60,
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const rawData = await response.json();
      return CommitHistoryResponseSchema.parse(rawData);
    } else {
      throw new Error('Failed to retrieve commit history');
    }
  } catch (error) {
    throw error;
  }
}
