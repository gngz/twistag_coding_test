import { config } from '@/config';
import { CommitHistoryResponseSchema } from '../models/commit-history-response';

export async function getRepositoryCommitHistory(repoName: string) {
  try {
    const response = await fetch(
      `${config.githubBaseUrl}/repos/${repoName}/stats/participation`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const rawData = await response.json();

    if (response.ok) {
      const result = CommitHistoryResponseSchema.parse(rawData);
      return result;
    }
  } catch (error) {
    throw error;
  }
}
