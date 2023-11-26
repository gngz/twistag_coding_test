import { getRepositoryCommitHistory } from './stats';

describe('getRepositoryCommitHistory', () => {
  it('should retrieve commit history for a given repository', async () => {
    const repoName = 'facebook/react';

    // Call the function and get the result
    const result = await getRepositoryCommitHistory(repoName);

    // Assert that the result is not null or undefined
    expect(result).toBeDefined();

    // Add more assertions to validate the result based on your business logic
    // For example, you can check if the returned result has the expected properties or values
  });

  it('should throw an error if the search request fails', async () => {
    const repoName = 'invalid-repo-name';

    // Call the function and expect it to throw an error
    await expect(getRepositoryCommitHistory(repoName)).rejects.toThrow(
      'Failed to retrieve commit history'
    );
  });
});
