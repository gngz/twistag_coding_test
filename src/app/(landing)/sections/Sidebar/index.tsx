'use client';
import EmptyState from '@/components/EmptyState';
import RepositoryCard from '@/components/RepositoryCard';
import SearchInput from '@/components/SearchInput';
import {
  RepositoryContext,
  RepositoryUtilsContext,
  SelectedRepositoryContext,
} from '@/providers/RepositoryProvider';
import { searchRepo } from '@/services/github';
import { APIRepositoryModel } from '@/services/github/models/repository';
import { useCallback, useContext, useState } from 'react';
import SearchInputResult from './Result';

function renderResult(repository: APIRepositoryModel) {
  return <SearchInputResult repoName={repository.full_name} />;
}

export default function Sidebar() {
  const [results, setResults] = useState<APIRepositoryModel[]>([]);
  const repoData = useContext(RepositoryContext);
  const selectedRepo = useContext(SelectedRepositoryContext);
  const repositoryUtils = useContext(RepositoryUtilsContext);

  const addRepository = (repository: APIRepositoryModel) => {
    if (repositoryUtils) {
      repositoryUtils.addRepository(repository);
    }
  };

  const removeRepository = (repository: APIRepositoryModel) => {
    if (repositoryUtils) {
      repositoryUtils.removeRepository(repository);
      repositoryUtils.selectRepository(undefined);
    }
  };

  const selectRepository = (repositoryId: number | undefined) => {
    if (repositoryUtils) {
      repositoryUtils.selectRepository(repositoryId);
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
            <RepositoryCard
              onMouseEnter={() => selectRepository(repository.id)}
              onMouseLeave={() => selectRepository(undefined)}
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
