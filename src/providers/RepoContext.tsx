'use client';
import { RepositoryModel } from '@/models/repository';
import { getRepositoryCommitHistory } from '@/services/github/apis/stats';
import { APIRepositoryModel } from '@/services/github/models/repository';
import { generateRandomColor } from '@/utils/colors';
import React from 'react';
import { createContext, useState } from 'react';

type UpdateContextType =
  | {
      addRepository: (repository: APIRepositoryModel) => void;
      removeRepository: (repository: APIRepositoryModel) => void;
    }
  | undefined;

export const RepoContext = createContext<RepositoryModel[]>([]);
export const StatsContext = createContext<RepositoryModel[]>([]);
export const RepoUpdateContext = createContext<UpdateContextType>(undefined);

type Props = {
  children: React.ReactNode;
};

export function RepoProvider({ children }: Props) {
  const [repoData, setRepoData] = useState<RepositoryModel[]>([]);

  const addRepository = async (repository: APIRepositoryModel) => {
    const data = await getRepositoryCommitHistory(repository.full_name);
    setRepoData((old) => [
      ...old,
      {
        ...repository,
        color: generateRandomColor(),
        selected: false,
        stats: data,
      },
    ]);
  };

  const removeRepository = (repository: APIRepositoryModel) => {
    setRepoData((old) => old.filter((repo) => repo.id != repository.id));
  };

  return (
    <RepoUpdateContext.Provider value={{ addRepository, removeRepository }}>
      <RepoContext.Provider value={repoData}>{children}</RepoContext.Provider>
    </RepoUpdateContext.Provider>
  );
}
