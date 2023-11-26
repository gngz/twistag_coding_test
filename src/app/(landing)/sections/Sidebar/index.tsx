'use client';
import EmptyState from '@/components/EmptyState';
import RepoCard from '@/components/RepoCard';
import SearchInput from '@/components/SearchInput';
import {
  RepositoryContext,
  RepositoryUpdateContext,
  SelectedRepositoryContext,
} from '@/providers/RepositoryProvider';
import { searchRepo } from '@/services/github';
import { APIRepositoryModel } from '@/services/github/models/repository';
import { useCallback, useContext, useState } from 'react';
import SearchInputResult from './Result';

function renderResult(repo: APIRepositoryModel) {
  return <SearchInputResult repoName={repo.full_name} />;
}

export default function Sidebar() {
  const [results, setResults] = useState<APIRepositoryModel[]>([]);
  const repoData = useContext(RepositoryContext);
  const selectedRepo = useContext(SelectedRepositoryContext);
  const repoUtils = useContext(RepositoryUpdateContext);

  const addRepository = (repository: APIRepositoryModel) => {
    if (repoUtils) {
      repoUtils.addRepository(repository);
    }
  };

  const removeRepository = (repository: APIRepositoryModel) => {
    if (repoUtils) {
      repoUtils.removeRepository(repository);
      repoUtils.selectRepostiory(null);
    }
  };

  const selectRepository = (repositoryId: number | null) => {
    if (repoUtils) {
      repoUtils.selectRepostiory(repositoryId);
    }
  };

  const renderEmptyState = () => {
    if (!repoData.length) return <EmptyState />;
  };

  const resultSelectHanlder = (result: APIRepositoryModel) => {
    setResults([]);
    addRepository(result);
  };

  const onQueryHandler = useCallback(async (query: string) => {
    if (query.length > 0) {
      const results = await searchRepo(query);
      setResults(results ?? []);
    } else {
      setResults([]);
    }
  }, []);

  async (query: string) => {
    if (query.length > 0) {
      const results = await searchRepo(query);
      setResults(results ?? []);
    } else {
      setResults([]);
    }
  };

  return (
    <aside className='col-span-3 h-full w-full bg-primary px-8 pt-20'>
      <div className='mb-6'>
        <SearchInput<APIRepositoryModel>
          results={results}
          placeholder='Search a Github Repository...'
          onResultSelect={resultSelectHanlder}
          renderResult={renderResult}
          onQuery={onQueryHandler}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {renderEmptyState()}
        {repoData.map((repository) => {
          return (
            <RepoCard
              onMouseEnter={() => selectRepository(repository.id)}
              onMouseLeave={() => selectRepository(null)}
              key={repository.id}
              repoFullName={repository.full_name}
              stars={repository.stars}
              lastUpdate={repository.updated_at}
              color={repository.color}
              dim={selectedRepo ? selectedRepo != repository.id : false}
              onRemove={() => removeRepository(repository)}
            />
          );
        })}
      </div>
    </aside>
  );
}
