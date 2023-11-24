import { CommitHistoryResponseSchema } from '../models/commit-history-response';

export async function getRepositoryCommitHistory(repoName: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoName}/stats/participation`,
      {}
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
