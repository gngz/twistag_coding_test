'use client';
import { RepositoryModel } from '@/models/repository';
import { getRepositoryCommitHistory } from '@/services/github/apis/stats';
import { APIRepositoryModel } from '@/services/github/models/repository';
import { generateRandomColor } from '@/utils/colors';
import React, { createContext, useState } from 'react';
import { UpdateContextType } from './types';

export const RepositoryContext = createContext<RepositoryModel[]>([]);
export const SelectedRepositoryContext = createContext<number | undefined>(
  undefined
);
export const RepositoryUpdateContext =
  createContext<UpdateContextType>(undefined);

type Props = {
  children: React.ReactNode;
};

export function RepositoryProvider({ children }: Props) {
  const [repoData, setRepoData] = useState<RepositoryModel[]>([]);
  const [selected, setSelected] = useState<number | undefined>(undefined);

  const addRepository = async (repository: APIRepositoryModel) => {
    if (repoData.find((repo) => repo.id === repository.id)) {
      return;
    }

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

  const selectRepository = (id: number | null) => {
    setSelected(id ?? undefined);
  };

  return (
    <SelectedRepositoryContext.Provider value={selected}>
      <RepositoryUpdateContext.Provider
        value={{
          addRepository,
          removeRepository,
          selectRepostiory: selectRepository,
        }}
      >
        <RepositoryContext.Provider value={repoData}>
          {children}
        </RepositoryContext.Provider>
      </RepositoryUpdateContext.Provider>
    </SelectedRepositoryContext.Provider>
  );
}
