'use client';
import EmptyState from '@/components/EmptyState';
import RepoCard from '@/components/RepoCard';
import SearchInput from '@/components/SearchInput';
import { RepoContext, RepoUpdateContext } from '@/providers/RepoContext';
import { searchRepo } from '@/services/github';
import { APIRepositoryModel } from '@/services/github/models/repository';
import { useContext, useState } from 'react';

type Props = {};

export default function Sidebar({}: Props) {
  const [results, setResults] = useState<APIRepositoryModel[]>([]);
  const repoData = useContext(RepoContext);
  const repoUtils = useContext(RepoUpdateContext);

  return (
    <aside className='col-span-3 h-full w-full bg-primary px-8 pt-20'>
      <div className='mb-6'>
        <SearchInput<APIRepositoryModel>
          results={results}
          placeholder='Search a Github Repository...'
          onResultSelect={(result) => {
            setResults([]);
            repoUtils && repoUtils.addRepository(result);
          }}
          renderResult={(repo) => (
            <div className='text-lg font-bold'>{repo.full_name}</div>
          )}
          onQuery={async (query) => {
            if (query.length > 0) {
              const results = await searchRepo(query);
              setResults(results ?? []);
            } else {
              setResults([]);
            }
          }}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {repoData.length === 0 && <EmptyState />}
        {repoData.map((repo) => {
          return (
            <RepoCard
              key={repo.id}
              repoFullName={repo.full_name}
              stars={repo.stars}
              lastUpdate={repo.updated_at}
              color={repo.color}
              dim={false}
              onRemove={() => {
                repoUtils?.removeRepository(repo);
              }}
            />
          );
        })}
      </div>
    </aside>
  );
}
