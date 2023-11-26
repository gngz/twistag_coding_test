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
export const RepositoryUtilsContext =
  createContext<UpdateContextType>(undefined);

type Props = {
  children: React.ReactNode;
};

export function RepositoryProvider({ children }: Props) {
  const [repositoryData, setRepositoryData] = useState<RepositoryModel[]>([]);
  const [selectedRepository, setSelectedRepository] = useState<
    number | undefined
  >(undefined);

  const addRepository = async (repository: APIRepositoryModel) => {
    if (repositoryData.find((repo) => repo.id === repository.id)) {
      return;
    }

    const data = await getRepositoryCommitHistory(repository.full_name);
    setRepositoryData((old) => [
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
    setRepositoryData((old) => old.filter((repo) => repo.id != repository.id));
  };

  const selectRepository = (id: number | undefined) => {
    setSelectedRepository(id);
  };

  const repositoryUtils = {
    addRepository,
    removeRepository,
    selectRepository,
  };

  return (
    <SelectedRepositoryContext.Provider value={selectedRepository}>
      <RepositoryContext.Provider value={repositoryData}>
        <RepositoryUtilsContext.Provider value={repositoryUtils}>
          {children}
        </RepositoryUtilsContext.Provider>
      </RepositoryContext.Provider>
    </SelectedRepositoryContext.Provider>
  );
}
