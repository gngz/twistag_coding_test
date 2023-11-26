import { APIRepositoryModel } from '@/services/github/models/repository';

export type UpdateContextType =
  | {
      addRepository: (repository: APIRepositoryModel) => void;
      removeRepository: (repository: APIRepositoryModel) => void;
      selectRepository: (id: number | undefined) => void;
    }
  | undefined;
